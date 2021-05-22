provider "aws" {
  region = "eu-west-2"
  profile = "dojo-security"
}

data "aws_availability_zones" "all" {}

resource "aws_s3_bucket" "frontend-dojo-security-theodo" {
  bucket = "frontend-dojo-security-theodo"
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

output "s3-url" {
  value = aws_s3_bucket.frontend-dojo-security-theodo.website_endpoint
}