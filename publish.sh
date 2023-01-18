#!/bin/bash
# Login to AWS ECR
aws ecr get-login-password | docker login --username AWS --password-stdin 445007777844.dkr.ecr.eu-central-1.amazonaws.com

# Build and push the image to AWS ECR
docker buildx build --load -f Dockerfile --platform=linux/amd64 . -t 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-backend
docker push 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-backend

# docker build -t 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-backend:amd64 --platform linux/amd64 .
# docker push 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-backend:amd64
