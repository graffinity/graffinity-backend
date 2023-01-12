#!/bin/bash

aws ecr get-login-password | docker login --username $AWS_USERNAME --password-stdin $AWS_ECR_ENDPOINT
docker compose pull
docker compose up -d