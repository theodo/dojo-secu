provider "aws" {
  region = "eu-west-2"
  profile = "dojo-security"
}

data "aws_ami" "amazon-linux" {
  owners = ["amazon"]
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

data "terraform_remote_state" "s3-web-site" {
  backend = "s3"
  config = {
    bucket = "dojo-secu-terraform-states"
    key = "frontend"
    region = "eu-west-2"
    profile = "dojo-security"
  }
}

data "terraform_remote_state" "alb" {
  backend = "s3"
  config = {
    bucket = "dojo-secu-terraform-states"
    key = "alb"
    region = "eu-west-2"
    profile = "dojo-security"
  }
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

resource "aws_lb_target_group_attachment" "target_1" {
  target_group_arn = data.terraform_remote_state.alb.outputs.target-group-arn
  target_id        = aws_instance.worker-ec2.id
  port             = 8000
}

resource "aws_instance" "worker-ec2" {
  ami = data.aws_ami.amazon-linux.image_id
  instance_type = "t2.micro"
  associate_public_ip_address = false
  security_groups = [data.terraform_remote_state.security.outputs.sg-worker]
  subnet_id = data.terraform_remote_state.networking.outputs.worker-subnet
  key_name = "aws-dojo-secu"

  user_data = <<EOF
 		#! /bin/bash
        sudo yum install -y git

        sudo amazon-linux-extras disable php7.4
        sudo amazon-linux-extras disable php7.3
        sudo amazon-linux-extras enable php7.2
        sudo yum -y install php php-{pear,cgi,common,curl,mbstring,gd,mysqlnd,gettext,bcmath,json,xml,fpm,intl,zip,imap}

        sudo curl -sS https://getcomposer.org/installer | sudo php
        sudo mv composer.phar /usr/local/bin/composer
        sudo ln -s /usr/local/bin/composer /usr/bin/composer

        (cd /home/ec2-user; git clone https://github.com/theodo/dojo-secu.git)

        (cd /home/ec2-user/dojo-secu; git checkout version-sans-docker)

        private_ip=$(curl http://169.254.169.254/latest/meta-data/local-ipv4)
        replace_cmd="s/ec2_private_ip/$private_ip/g"
        (cd /home/ec2-user/dojo-secu/backend/config/packages; sed -i $replace_cmd framework.yaml)

        private_alb_dns=${data.terraform_remote_state.alb.outputs.alb-dns}
        replace_cmd="s/alb_private_dns/$private_alb_dns/g"
        (cd /home/ec2-user/dojo-secu/backend/config/packages; sed -i $replace_cmd framework.yaml)

        website_s3_bucket=${data.terraform_remote_state.s3-web-site.outputs.s3-url}
        replace_cmd="s/s3_bucket_endpoint/$website_s3_bucket/g"
        (cd /home/ec2-user/dojo-secu/backend/; sed -i $replace_cmd .env)

 	EOF

  tags = {
    Name: "worker-ec2-security-dojo"
  }
}

output "worker-private-ip" {
  value = aws_instance.worker-ec2.private_ip
}