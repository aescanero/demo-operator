## Creating the Helm Chart

1. Create the Helm chart structure:
```bash
mkdir -p helm-chart/demo-operator/crds
mkdir -p helm-chart/demo-operator/templates
```

2. Create Chart.yaml:
```bash
cat > helm-chart/demo-operator/Chart.yaml << EOL
apiVersion: v2
name: demo-operator
description: A Helm chart for Demo Operator
type: application
version: 0.1.0
appVersion: "0.0.1"
EOL
```

3. Create values.yaml:
```bash
cat > helm-chart/demo-operator/values.yaml << EOL
replicaCount: 1
image:
  repository: aescanero/demo-operator
  tag: "v0.0.1"
  pullPolicy: IfNotPresent

namespace: demo-operator-system
createNamespace: true
EOL
```

4. Copy the CRD:
```bash
cp operator-quarkus/target/kubernetes/demoagents.demo.disasterproject.com-v1.yml helm-chart/demo-operator/crds/
```

5. Create RBAC templates:
```bash
# Create serviceaccount.yaml
cat > helm-chart/demo-operator/templates/serviceaccount.yaml << EOL
apiVersion: v1
kind: ServiceAccount
metadata:
  name: {{ .Release.Name }}-controller-manager
  namespace: {{ .Values.namespace }}
EOL

# Create role.yaml
cat > helm-chart/demo-operator/templates/role.yaml << EOL
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: {{ .Release.Name }}-manager-role
rules:
- apiGroups:
  - demo.disasterproject.com
  resources:
  - demoagents
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - ""
  resources:
  - services
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - apps
  resources:
  - deployments
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
EOL

# Create role_binding.yaml
cat > helm-chart/demo-operator/templates/role_binding.yaml << EOL
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: {{ .Release.Name }}-manager-rolebinding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: {{ .Release.Name }}-manager-role
subjects:
- kind: ServiceAccount
  name: {{ .Release.Name }}-controller-manager
  namespace: {{ .Values.namespace }}
EOL

# Create deployment.yaml
cat > helm-chart/demo-operator/templates/deployment.yaml << EOL
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-controller-manager
  namespace: {{ .Values.namespace }}
  labels:
    control-plane: controller-manager
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      control-plane: controller-manager
  template:
    metadata:
      labels:
        control-plane: controller-manager
    spec:
      serviceAccountName: {{ .Release.Name }}-controller-manager
      containers:
      - name: manager
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: 8080
          name: http
          protocol: TCP
        securityContext:
          allowPrivilegeEscalation: false
EOL
```

6. Install the operator using Helm:
```bash
helm install demo-operator ./helm-chart/demo-operator
```
