#!/bin/bash

docker build -t $AWS_ECR_ENDPOINT/graffinity-backend:amd64 --platform linux/amd64 .