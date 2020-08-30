#!/usr/bin/env sh

if ! command -v docker &> /dev/null
then
    echo "docker could not be found"
    exit
fi

docker run --rm -d  -p 8082:8082/tcp midgard-graphql:latest