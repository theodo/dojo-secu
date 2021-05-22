terraform {
  backend "s3" {
    bucket         = "dojo-secu-terraform-states"
    key            = "frontend"
    region         = "eu-west-2"
    profile        = "dojo-security"
  }
}
