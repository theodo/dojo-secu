provider "aws" {
  region = "eu-west-2"
  profile = "dojo-security"
}

data "terraform_remote_state" "networking" {
  backend = "s3"
  config = {
    bucket = "dojo-secu-terraform-states"
    key = "networking"
    region = "eu-west-2"
    profile = "dojo-security"
  }
}

resource "aws_security_group" "sg-bastion" {
  vpc_id = data.terraform_remote_state.networking.outputs.vpc
  ingress {
    from_port = 22
    protocol = "tcp"
    to_port = 22
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    protocol = "-1"
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name: "sg-bastion-security-dojo"
  }
}

resource "aws_security_group" "sg-alb" {
  vpc_id = data.terraform_remote_state.networking.outputs.vpc
  ingress {
    from_port = 80
    protocol = "tcp"
    to_port = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    protocol = "-1"
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name: "sg-alb-security-dojo"
  }
}

resource "aws_security_group" "sg-worker" {
  vpc_id = data.terraform_remote_state.networking.outputs.vpc
  ingress {
    from_port = 22
    protocol = "tcp"
    to_port = 22
    security_groups = [aws_security_group.sg-bastion.id]
  }
  ingress {
    from_port = 8000
    protocol = "tcp"
    to_port = 8000
    security_groups = [aws_security_group.sg-alb.id]
  }
  egress {
    from_port = 0
    protocol = "-1"
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name: "sg-worker-security-dojo"
  }
}

output "sg-bastion" {
  value = aws_security_group.sg-bastion.id
}

output "sg-worker" {
  value = aws_security_group.sg-worker.id
}

output "sg-alb" {
  value = aws_security_group.sg-alb.id
}
