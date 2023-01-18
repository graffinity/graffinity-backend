#!/bin/bash
# Build the image to AWS ECR
docker buildx build --load -f Dockerfile . -t 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-backend
# docker build -t 445007777844.dkr.ecr.eu-central-1.amazonaws.com/graffinity-backend:amd64 --platform linux/amd64 .
