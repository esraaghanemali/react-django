#!/usr/bin/env bash
set -euo pipefail
kustomize build "$@" | envsubst
