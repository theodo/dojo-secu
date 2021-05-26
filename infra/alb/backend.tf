terraform {
  backend "s3" {
    bucket         = "dojo-secu-terraform-states"
    key            = "alb"
    region         = "eu-west-2"
    profile        = "dojo-security"
  }
}
