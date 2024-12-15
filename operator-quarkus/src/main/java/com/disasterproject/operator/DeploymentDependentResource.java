package com.disasterproject.operator;

import com.disasterproject.operator.model.DemoAgent;
import io.fabric8.kubernetes.api.model.apps.Deployment;
import io.fabric8.kubernetes.api.model.apps.DeploymentBuilder;
import io.javaoperatorsdk.operator.api.reconciler.Context;
import io.javaoperatorsdk.operator.processing.dependent.kubernetes.CRUDKubernetesDependentResource;

public class DeploymentDependentResource extends CRUDKubernetesDependentResource<Deployment, DemoAgent> {
    
    public DeploymentDependentResource() {
        super(Deployment.class);
    }

    @Override
    protected Deployment desired(DemoAgent demoAgent, Context<DemoAgent> context) {
        return new DeploymentBuilder()
            .withNewMetadata()
                .withName(demoAgent.getMetadata().getName())
                .withNamespace(demoAgent.getMetadata().getNamespace())
            .endMetadata()
            .withNewSpec()
                .withNewSelector()
                    .addToMatchLabels("app", demoAgent.getMetadata().getName())
                .endSelector()
                .withNewTemplate()
                    .withNewMetadata()
                        .addToLabels("app", demoAgent.getMetadata().getName())
                    .endMetadata()
                    .withNewSpec()
                        .addNewContainer()
                            .withName("main")
                            .withImage(demoAgent.getSpec().getImage())
                            .addNewPort()
                                .withContainerPort(demoAgent.getSpec().getPort())
                            .endPort()
                        .endContainer()
                    .endSpec()
                .endTemplate()
            .endSpec()
            .build();
    }
}
