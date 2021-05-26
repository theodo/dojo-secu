provider "aws" {
  region = "eu-west-2"
  profile = "dojo-security"
}

data "aws_availability_zones" "all" {}

######################################################################################
## VPC (65K private IPs)
######################################################################################
resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name: "vpc-security-dojo"
  }
}

######################################################################################
## PUBLIC SUBNET FOR BASTION
######################################################################################
resource "aws_subnet" "public-subnet-bastion" {
  cidr_block = "10.0.1.0/24"
  vpc_id = aws_vpc.vpc.id
  availability_zone = data.aws_availability_zones.all.names[0]
  assign_ipv6_address_on_creation = false
  map_public_ip_on_launch = true
  tags = {
    Name: "bastion-subnet-security-dojo"
  }
}

resource "aws_subnet" "public-subnet-alb-1" {
  cidr_block = "10.0.3.0/24"
  vpc_id = aws_vpc.vpc.id
  availability_zone = data.aws_availability_zones.all.names[0]
  assign_ipv6_address_on_creation = false
  map_public_ip_on_launch = true
  tags = {
    Name: "alb-subnet-1-security-dojo"
  }
}
resource "aws_subnet" "public-subnet-alb-2" {
  cidr_block = "10.0.4.0/24"
  vpc_id = aws_vpc.vpc.id
  availability_zone = data.aws_availability_zones.all.names[1]
  assign_ipv6_address_on_creation = false
  map_public_ip_on_launch = true
  tags = {
    Name: "alb-subnet-2-security-dojo"
  }
}
######################################################################################
## PRIVATE SUBNETS FOR SERVERS
######################################################################################
resource "aws_subnet" "private-subnet" {
  cidr_block = "10.0.2.0/24"
  vpc_id = aws_vpc.vpc.id
  availability_zone = data.aws_availability_zones.all.names[0]
  assign_ipv6_address_on_creation = false
  map_public_ip_on_launch = false
  tags = {
    Name: "private-subnet-security-dojo"
  }
}

######################################################################################
## INTERNET GATEWAY
######################################################################################
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id
  tags = {
    Name: "igw-security-dojo"
  }
}

######################################################################################
## PUBLIC ROUTE TABLE + ASSOCIATIONS
## internet access IN/OUT through Internet Gateway
######################################################################################
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name: "public-rt-security-dojo"
  }
}

resource "aws_route_table_association" "public_rt_assoc" {
  route_table_id = aws_route_table.public_rt.id
  subnet_id = aws_subnet.public-subnet-bastion.id
}
resource "aws_route_table_association" "public_rt_assoc_alb_1" {
  route_table_id = aws_route_table.public_rt.id
  subnet_id = aws_subnet.public-subnet-alb-1.id
}
resource "aws_route_table_association" "public_rt_assoc_alb_2" {
  route_table_id = aws_route_table.public_rt.id
  subnet_id = aws_subnet.public-subnet-alb-2.id
}
######################################################################################
## NAT GATEWAY
######################################################################################
resource "aws_eip" "natgw-eip" {
  tags = {
    Name: "eip-security-dojo"
  }
}
resource "aws_nat_gateway" "nat-gateway" {
  tags = {
    Name: "nat-gw-security-dojo"
  }
  subnet_id = aws_subnet.public-subnet-bastion.id
  allocation_id = aws_eip.natgw-eip.id
}

######################################################################################
## PRIVATE ROUTE TABLE + ASSOCIATIONS
## internet access OUT ONLY through NAT Gateway
######################################################################################
resource "aws_route_table" "private_rt" {
  vpc_id = aws_vpc.vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat-gateway.id
  }
  tags = {
    Name: "private-rt-security-dojo"
  }
}
resource "aws_route_table_association" "private_rt_assoc_1" {
  route_table_id = aws_route_table.private_rt.id
  subnet_id = aws_subnet.private-subnet.id
}

######################################################################################
######################################################################################

output "vpc" {
  value = aws_vpc.vpc.id
}

output "bastion-subnet" {
  value = aws_subnet.public-subnet-bastion.id
}

output "worker-subnet" {
  value = aws_subnet.private-subnet.id
}

output "alb-subnet-1" {
  value = aws_subnet.public-subnet-alb-1.id
}

output "alb-subnet-2" {
  value = aws_subnet.public-subnet-alb-2.id
}
