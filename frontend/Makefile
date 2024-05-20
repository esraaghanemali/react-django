
include ../infrastructure/make/include.mk

PNPM                  := pnpm
SERVICE_NAME          := brightest-ui
NAMESPACE             := frontend
IMAGE_TAG             := latest
IMAGE_URI             := yallaesraa/frontend

install:
	@echo ">> installing from package.json ☕️"
	@$(PNPM) install

run: install
	@echo ">> running app locally"
	@$(PNPM) run start

prepare-image:
	docker build -t frontend .
	docker tag frontend $(IMAGE_URI):$(IMAGE_TAG)
	# docker push $(IMAGE_URI):$(IMAGE_TAG)

# Build the final development_manifest
build-k8s-development:
	IMAGE_TAG=$(IMAGE_TAG) IMAGE_URI=$(IMAGE_URI) NAMESPACE=$(NAMESPACE) SERVICE_NAME=$(SERVICE_NAME) $(ROOT_DIR)/infrastructure/make/kustomize-envsubst.sh ./k8s/overlays/development/ > ./k8s/development_manifest.yaml

# Delete the old deplpyement and create a new one
deploy:
	kubectl delete deployment brightest-ui -n frontend
	kubectl apply -f ./k8s/development_manifest.yaml

# Only if you are starting for the first time
init:
	minikube start
	kubectl create namespace frontend
	kubectl create namespace backend


.PHONY: run install build-k8s-development prepare-image deploy
