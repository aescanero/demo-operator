package com.disasterproject.operator;

import com.disasterproject.operator.model.DemoAgent;
import io.javaoperatorsdk.operator.api.reconciler.*;
import io.javaoperatorsdk.operator.api.reconciler.dependent.Dependent;

@ControllerConfiguration(dependents = {
    @Dependent(type = DeploymentDependentResource.class),
    @Dependent(type = ServiceDependentResource.class)
})
public class DemoAgentController implements Reconciler<DemoAgent> {
    
    @Override
    public UpdateControl<DemoAgent> reconcile(DemoAgent resource, Context<DemoAgent> context) {
        return UpdateControl.noUpdate();
    }
}
