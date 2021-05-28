provider "aws" {
  region = "eu-west-2"
  profile = "dojo-security"
}

data "aws_availability_zones" "all" {}

resource "aws_s3_bucket" "frontend-dojo-security-theodo" {
  bucket = "deathstar.dojo.theo.do"
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "frontend-s3-policy" {
  bucket = "deathstar.dojo.theo.do"

  policy = jsonencode({
      Version = "2012-10-17"
      Id      = "frontend-s3-policy"
      Statement = [
        {
          Sid       = "PublicRead"
          Effect    = "Allow"
          Principal = "*"
          Action    = ["s3:GetObject","s3:GetObjectVersion"]
          Resource = [
            aws_s3_bucket.frontend-dojo-security-theodo.arn,
            "${aws_s3_bucket.frontend-dojo-security-theodo.arn}/*",
          ]
        },
      ]
    })
}

output "s3-url" {
  value = aws_s3_bucket.frontend-dojo-security-theodo.website_endpoint
}
