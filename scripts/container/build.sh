#!/usr/bin/env sh

if ! command -v docker &> /dev/null
then
    echo "docker could not be found"
    exit
fi

docker build --tag midgard-graphql:latest .
