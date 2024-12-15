# Demo Operator

This Kubernetes operator is an example that manages a CRD (Custom Resource Definition) called `DemoAgent`. The operator creates and manages a Deployment and a Service based on the configuration provided in the CRD.

## Prerequisites

- JDK 17+
- Maven 3.8+
- Kubernetes cluster (or minikube)
- kubectl configured
- Docker

## Project Structure

```
operator-quarkus/
├── pom.xml
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── disasterproject/
│       │           └── operator/
│       │               ├── DemoAgentController.java
│       │               ├── DeploymentDependentResource.java
│       │               ├── ServiceDependentResource.java
│       │               ├── DemoOperator.java
│       │               └── model/
│       │                   ├── DemoAgent.java
│       │                   ├── DemoAgentSpec.java
│       │                   └── DemoAgentStatus.java
│       └── resources/
│           └── application.properties
└── Dockerfile
```

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/aescanero/demo-operator.git
cd demo-operator/operator-quarkus
```

2. Build the project:
```bash
mvn clean package
```

3. Build Docker image:
```bash
docker build -t aescanero/demo-operator:v0.0.1 .
docker push aescanero/demo-operator:v0.0.1
```

4. Install the operator using Helm:
You can install the operator in any namespace. Here are some examples:

```bash
# Install in demo-operator-system namespace
helm install demo-operator ./helm-chart/demo-operator -n demo-operator-system --create-namespace

# Install in default namespace
helm install demo-operator ./helm-chart/demo-operator

# Install in custom namespace
helm install demo-operator ./helm-chart/demo-operator -n my-custom-namespace --create-namespace
```

## Usage

1. Create a DemoAgent resource:

```yaml
apiVersion: demo.disasterproject.com/v1alpha1
kind: DemoAgent
metadata:
  name: demo-test
spec:
  image: nginx:latest
  port: 80
```

2. Apply the resource:
```bash
kubectl apply -f demoagent.yaml
```

## Helm Chart Structure

```
helm-chart/
└── demo-operator/
    ├── Chart.yaml
    ├── values.yaml
    ├── templates/
    │   ├── serviceaccount.yaml
    │   ├── role.yaml
    │   ├── role_binding.yaml
    │   ├── deployment.yaml
    │   └── crd.yaml
    └── crds/
        └── demo.disasterproject.com_demoagents.yaml
```

## Verification

Replace `<namespace>` with the namespace where you installed the operator:

```bash
# View installed CRDs
kubectl get crds | grep demo

# View running operator
kubectl get pods -n <namespace>

# View resources created by the operator
kubectl get demoagents -n <namespace>

# View operator logs
kubectl logs -n <namespace> deployment/demo-operator-controller-manager -c manager
```

## Development

For local development, you can run:
```bash
mvn quarkus:dev
```

## Uninstallation

To uninstall the operator, make sure to specify the same namespace used during installation:

```bash
# If installed in demo-operator-system
helm uninstall demo-operator -n demo-operator-system

# If installed in default namespace
helm uninstall demo-operator

# If installed in custom namespace
helm uninstall demo-operator -n my-custom-namespace
```

## Versions

- Quarkus: 3.6.0
- Operator SDK: 5.1.3
- Java: 17
- Kubernetes: 1.25+

## License

This project is licensed under the Apache License 2.0.