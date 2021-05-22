
resource "aws_lb" "alb" {
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.sg-alb.id]
  subnets            = [
    aws_subnet.public-subnet-alb-1.id,
    aws_subnet.public-subnet-alb-2.id,
  ]

  enable_deletion_protection = false

  tags = {
    Name: "alb-security-dojo"
  }
}

resource "aws_lb_target_group" "alb_target_group" {
  port     = 80
  protocol = "HTTP"
  vpc_id = aws_vpc.vpc.id
  health_check {
    path = "/health-check"
    port = 8000
  }
  tags = {
    Name: "alb-target-group-security-dojo"
  }
}

resource "aws_lb_target_group_attachment" "target_1" {
  target_group_arn = aws_lb_target_group.alb_target_group.arn
  target_id        = aws_instance.worker-ec2.id
  port             = 8000
}

resource "aws_lb_listener" "my_alb_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port = 80
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb_target_group.arn
  }
}

output "alb_dns" {
  value = aws_lb.alb.dns_name
}