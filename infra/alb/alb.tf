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

data "terraform_remote_state" "security" {
  backend = "s3"
  config = {
    bucket = "dojo-secu-terraform-states"
    key = "security"
    region = "eu-west-2"
    profile = "dojo-security"
  }
}

data "aws_availability_zones" "all" {}

resource "aws_lb" "alb" {
  internal           = false
  load_balancer_type = "application"
  security_groups    = [data.terraform_remote_state.security.outputs.sg-alb]
  subnets            = [
    data.terraform_remote_state.networking.outputs.alb-subnet-1,
    data.terraform_remote_state.networking.outputs.alb-subnet-2,
  ]

  enable_deletion_protection = false

  tags = {
    Name: "alb-security-dojo"
  }
}

resource "aws_lb_target_group" "alb_target_group" {
  port     = 80
  protocol = "HTTP"
  vpc_id = data.terraform_remote_state.networking.outputs.vpc
  health_check {
    path = "/health-check"
    port = 8000
  }
  tags = {
    Name: "alb-target-group-security-dojo"
  }
}

resource "aws_lb_listener" "my_alb_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port = 80
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb_target_group.arn
  }
}

output "alb-dns" {
  value = aws_lb.alb.dns_name
}

output "target-group-arn" {
  value = aws_lb_target_group.alb_target_group.arn
}
