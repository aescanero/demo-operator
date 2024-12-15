package com.disasterproject.service;

import io.fabric8.kubernetes.client.KubernetesClient;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import com.disasterproject.model.DemoAgent;
import com.disasterproject.model.DemoAgentList;
import com.disasterproject.model.DemoAgentSpec;

@ApplicationScoped
public class DemoAgentService {
    
    @Inject
    KubernetesClient client;

    public List<DemoAgent> list() {
        return client.resources(DemoAgent.class, DemoAgentList.class)
            .inAnyNamespace()
            .list()
            .getItems();
    }

    public DemoAgent get(String name, String namespace) {
        return client.resources(DemoAgent.class, DemoAgentList.class)
            .inNamespace(namespace)
            .withName(name)
            .get();
    }

    public DemoAgent create(DemoAgent demoAgent, String namespace) {
        return client.resources(DemoAgent.class, DemoAgentList.class)
            .inNamespace(namespace)
            .resource(demoAgent)
            .create();
    }

    public DemoAgent update(String name, DemoAgent demoAgent, String namespace) {
        return client.resources(DemoAgent.class, DemoAgentList.class)
            .inNamespace(namespace)
            .withName(name)
            .replace(demoAgent);
    }

    public void delete(String name, String namespace) {
        client.resources(DemoAgent.class, DemoAgentList.class)
            .inNamespace(namespace)
            .withName(name)
            .delete();
    }
}