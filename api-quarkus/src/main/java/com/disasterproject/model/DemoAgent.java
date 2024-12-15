package com.disasterproject.model;

import io.fabric8.kubernetes.api.model.Namespaced;
import io.fabric8.kubernetes.client.CustomResource;
import io.fabric8.kubernetes.model.annotation.Group;
import io.fabric8.kubernetes.model.annotation.Version;

@Version("v1alpha1")
@Group("demo.disasterproject.com")
public class DemoAgent extends CustomResource<DemoAgentSpec, Void> implements Namespaced {    private String name;
}
