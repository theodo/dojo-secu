
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
  security_groups = [aws_security_group.sg-bastion.id]
  subnet_id = aws_subnet.public-subnet-bastion.id
  key_name = "aws-dojo-secu"

  tags = {
    Name: "bastion-ec2-security-dojo"
  }
}

resource "aws_instance" "worker-ec2" {
  ami = data.aws_ami.amazon-linux.image_id
  instance_type = "t2.micro"
  associate_public_ip_address = false
  security_groups = [aws_security_group.sg-worker.id]
  subnet_id = aws_subnet.private-subnet.id
  key_name = "aws-dojo-secu"

  user_data = <<EOF
 		#! /bin/bash
        sudo yum install -y docker
        sudo systemctl enable docker
        sudo systemctl start docker
        sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        sudo yum install -y git
        (cd /home/ec2-user; git clone https://github.com/theodo/dojo-secu.git)

        private_ip=$(curl http://169.254.169.254/latest/meta-data/local-ipv4)
        replace="s/ec2_private_ip/$private_ip/g"
        (cd /home/ec2-user/dojo-secu; git checkout setup-alb
        (cd /home/ec2-user/dojo-secu/backend/config/packages; sed $replace framework.yaml
        (cd /home/ec2-user/dojo-secu; /usr/local/bin/docker-compose up -d)
 	EOF

  tags = {
    Name: "worker-ec2-security-dojo"
  }
}

output "bastion-public-ip" {
  value = aws_instance.bastion-ec2.public_ip
}

output "worker-private-ip" {
  value = aws_instance.worker-ec2.private_ip
}