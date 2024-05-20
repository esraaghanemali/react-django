# Devops and infrastructure

This app uses kubernetes and minikube to deplpy the app locally
The images are pushed to a private repo, in order to use your repo you need to update the variables in the file `frontend/Makefile`

```mk
IMAGE_TAG             := latest
IMAGE_URI             := yallaesraa/frontend
```

## How it works

each service will contain the folder k8s which contains all yaml files needed
it consists of the following folders:

- base/: Contains the base configurations.
  - kustomization.yaml: Main Kustomize file to define resources and configurations.
  - k8s-virtualservice.yaml: Istio VirtualService configuration for routing traffic.
  - config.env: Environment file containing variables used in the configurations.
- overlays/: Intended for environment-specific customizations (e.g., dev, prod).

The folder infrastructure/kustomize/ui conatins all k8s configuration that can be shared across all UIs (benefitial in case we have multiple IUs, not really important in this example since we have one UI)

**Resources used inside infrastructure/kustomize**

- hpa.yaml: defines a Horizontal Pod Autoscaler (HPA) for the Kubernetes deployment of your frontend service. The HPA automatically scales the number of pod replicas based on observed metrics, such as CPU utilization.
- k8s-virtualservice.yaml: configuration for an Istio VirtualService. Istio VirtualServices are a key component in defining the rules used for routing HTTP(S) traffic within an Istio service mesh. Let's dissect the contents of this configuration:
- k8s-svc.yaml: Service configuration file. This file defines a Service in Kubernetes. Creates a stable network address that can be used to access the Pods. Even if the Pods are killed or restarted, the Service provides a consistent way to reach them.
- gateway.yaml: Set up an ingress gateway for managing external access to services within the Kubernetes cluster

## Requirements

you need the following tools

- Make
- kubectl
- kustomize
- Minikube
- Istio

## Deploy the frontend

1. go to /frontend
2. Build and push docker image: run `make prepare-image`
3. (only for the first time) `make init`
4. Build the manifest: `make build-k8s-development`
   - this will generate development_manifest.yaml in k8s folder
5. deploy

```sh
kubectl apply -f ./k8s/development_manifest.yaml 
```

### Access the frontend

1. Get the Minikube IP

   ```sh
   minikube ip
   # Output example: 192.168.99.100
   ```

2. Get Ingress Gateway Port

```sh
kubectl get svc -n istio-system
```

Example output:

```
NAME                   TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                                      AGE
istio-ingressgateway   LoadBalancer   10.99.142.190   <pending>     15021:30751/TCP,80:32170/TCP,443:31950/TCP   4d22h
```

In this example, the port mapped to `80` is `32170`.
Open your browser and go to:

```
http://192.168.99.100:32170
```
