#!/bin/sh

kubectl create namespace demo --dry-run=client -o yaml | kubectl apply -f -

