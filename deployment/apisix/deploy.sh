#!/bin/sh

kubectl create namespace apisix

# Agregar los repositorios de API7
helm repo add apisix https://charts.apiseven.com
helm repo update

#helm install apisix-cluster . -n apisix -f values.yaml
kubectl -n apisix create secret generic apisix-etcd-root --from-literal=root-password=test
kubectl -n apisix create secret generic apisix-admin-apikey --from-literal=admin-apikey=test --from-literal=viewer-apikey=test
helm upgrade --install apisix apisix/apisix -n apisix -f apisix-controlplane-values.yaml
helm upgrade --install apisix-ingress apisix/apisix-ingress-controller -n apisix -f apisix-ingress-values.yaml
helm upgrade --install apisix-dashboard aecharts/apisix-dashboard -n apisix -f apisix-dashboard-values.yaml
helm upgrade --install apisix-dataplane apisix/apisix -n apisix -f apisix-dataplane-values.yaml
