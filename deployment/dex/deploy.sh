#!/bin/sh

kubectl create namespace dex --dry-run=client -o yaml | kubectl apply -f -

helm repo add dex https://charts.dexidp.io

kubectl -n dex create secret generic front-secret --from-literal=password=test
kubectl -n dex create secret generic apisix-secret --from-literal=password=test
kubectl -n dex create secret generic token-secret --from-literal=password=test
helm upgrade --install --create-namespace dex -n dex --wait dex/dex -f values.yaml
