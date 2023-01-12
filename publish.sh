#!/bin/bash

# Login to AWS ECR
aws ecr get-login-password | docker login --username $AWS_USERNAME --password-stdin $AWS_ECR_ENDPOINT

# Build and push the image to AWS ECR
docker build -t graffinity-backend:amd64 --platform linux/amd64 .
docker push graffinity-backend:amd64