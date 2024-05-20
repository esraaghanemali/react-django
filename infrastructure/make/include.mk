ifndef ROOT_DIR
	ROOT_DIR      := $(shell git rev-parse --show-toplevel)
endif

ALL_ENVS := $(shell test -d $(CURDIR)/k8s/overlays && ls $(CURDIR)/k8s/overlays)

# all envs that are deployed with the "deploy" target:
DEPLOY_ENVS := $(ALL_ENVS)

# TODO: This can  be integerated in the pipeline to deploy all services to all envs