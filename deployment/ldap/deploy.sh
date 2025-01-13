#!/bin/sh

kubectl create namespace dex --dry-run=client -o yaml | kubectl apply -f -

helm repo add aecharts https://aescanero.github.io/helm-charts/
helm repo update aecharts

kubectl -n dex create secret generic ldap-admin-secret --from-literal=password=test
helm upgrade --install ldap aecharts/ldap-chart -n dex -f ldap-values.yaml