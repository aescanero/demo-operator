package com.disasterproject.rest;

import com.disasterproject.model.DemoAgent;
import com.disasterproject.service.DemoAgentService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/demoagents")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DemoAgentResource {

    @Inject
    DemoAgentService demoAgentService;

    @GET
    public List<DemoAgent> list() {
        return demoAgentService.list();
    }

    @GET
    @Path("/{namespace}/{name}")
    public Response get(@PathParam("namespace") String namespace, @PathParam("name") String name) {
        DemoAgent agent = demoAgentService.get(name, namespace);
        if (agent == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(agent).build();
    }

    @POST
    @Path("/{namespace}")
    public Response create(@PathParam("namespace") String namespace, DemoAgent demoAgent) {
        DemoAgent created = demoAgentService.create(demoAgent, namespace);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{namespace}/{name}")
    public Response update(
            @PathParam("namespace") String namespace,
            @PathParam("name") String name,
            DemoAgent demoAgent) {
        DemoAgent updated = demoAgentService.update(name, demoAgent, namespace);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{namespace}/{name}")
    public Response delete(@PathParam("namespace") String namespace, @PathParam("name") String name) {
        demoAgentService.delete(name, namespace);
        return Response.noContent().build();
    }
}
