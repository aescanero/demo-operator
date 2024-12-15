package com.disasterproject.operator.model;

import io.fabric8.kubernetes.api.model.Namespaced;
import io.fabric8.kubernetes.client.CustomResource;
import io.fabric8.kubernetes.model.annotation.Group;
import io.fabric8.kubernetes.model.annotation.Version;

@Group("demo.disasterproject.com")
@Version("v1alpha1")
public class DemoAgent extends CustomResource<DemoAgentSpec, DemoAgentStatus> implements Namespaced {
}
