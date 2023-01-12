terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  profile = "default"
  region  = "eu-central-1"
}

resource "aws_ecr_repository" "graffinity-backend" {
  name = "graffinity-backend"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "graffinity-frontend" {
  name = "graffinity-frontend"

  image_scanning_configuration {
    scan_on_push = true
  }
}