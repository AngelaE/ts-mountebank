#!/usr/bin/env bash

set -eo pipefail

export PS1="(devbox)$PS1"
export NODE_PATH="$(readlink -e $(which node) | sed -E 's/\/bin\/node//g')"
export SOURCE_REPO_NAME=${PWD##*/}

export DOCKER_BUILDKIT=1

docker context use default
export DOCKER_HOST="unix:///var/run/docker.sock"

echo "###################################################################################################################"
echo "                                                                                  "
echo "##   !! $SOURCE_REPO_NAME DEVELOPMENT ENVIRONMENT ;) !!"
echo "##   DevBox VERSION: `devbox version`                 "
echo "##   NODE_PATH: $NODE_PATH                            "
echo "##   DOCKER_HOST: $DOCKER_HOST                        "
echo "                                                                                  "
echo "###################################################################################################################"

corepack prepare pnpm@9.9.0 --activate
corepack use pnpm@9.9.0
pnpm --frozen-lockfile --strict-peer-dependencies recursive install
