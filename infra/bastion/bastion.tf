provider "aws" {
  region = "eu-west-2"
  profile = "dojo-security"
}

data "aws_availability_zones" "all" {}

data "terraform_remote_state" "networking" {
  backend = "s3"
  config = {
    bucket = "dojo-secu-terraform-states"
    key = "networking"
    region = "eu-west-2"
    profile = "dojo-security"
  }
}

data "terraform_remote_state" "security" {
  backend = "s3"
  config = {
    bucket = "dojo-secu-terraform-states"
    key = "security"
    region = "eu-west-2"
    profile = "dojo-security"
  }
}

data "aws_ami" "amazon-linux" {
  owners = ["amazon"]
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_instance" "bastion-ec2" {
  ami = data.aws_ami.amazon-linux.image_id
  instance_type = "t2.micro"
  associate_public_ip_address = true
  security_groups = [data.terraform_remote_state.security.outputs.sg-bastion]
  subnet_id = data.terraform_remote_state.networking.outputs.bastion-subnet
  key_name = "aws-dojo-secu"

  tags = {
    Name: "bastion-ec2-security-dojo"
  }
}

output "bastion-public-ip" {
  value = aws_instance.bastion-ec2.public_ip
}