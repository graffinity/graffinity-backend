#!/bin/bash
aws ecr get-login-password | docker login --username AWS --password-stdin 445007777844.dkr.ecr.eu-central-1.amazonaws.com
sudo chown root config/filebeat.docker.yml
docker compose pull
docker compose up -d
