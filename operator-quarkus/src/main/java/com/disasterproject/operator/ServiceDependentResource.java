package com.disasterproject.operator;

import com.disasterproject.operator.model.DemoAgent;
import io.fabric8.kubernetes.api.model.Service;
import io.fabric8.kubernetes.api.model.ServiceBuilder;
import io.fabric8.kubernetes.api.model.IntOrString;
import io.javaoperatorsdk.operator.api.reconciler.Context;
import io.javaoperatorsdk.operator.processing.dependent.kubernetes.CRUDKubernetesDependentResource;

public class ServiceDependentResource extends CRUDKubernetesDependentResource<Service, DemoAgent> {
    
    public ServiceDependentResource() {
        super(Service.class);
    }

    @Override
    protected Service desired(DemoAgent demoAgent, Context<DemoAgent> context) {
        return new ServiceBuilder()
            .withNewMetadata()
                .withName(demoAgent.getMetadata().getName())
                .withNamespace(demoAgent.getMetadata().getNamespace())
            .endMetadata()
            .withNewSpec()
                .addToSelector("app", demoAgent.getMetadata().getName())
                .addNewPort()
                    .withPort(demoAgent.getSpec().getPort())
                    .withTargetPort(new IntOrString(demoAgent.getSpec().getPort()))
                .endPort()
            .endSpec()
            .build();
    }
}
