#!/bin/sh

kubectl -n apisix create secret generic apisix-etcd-root --from-literal=root-password=test
helm -n apisix upgrade --install apisix-etcd etcd -f apisix-etcd-values.yaml
