package org.jetservice;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

/*
  Demonstrates using DXP configuration information inside the service
*/

@Path("/echo")
public class EchoResource {

	private RestApplication _parent;

    public EchoResource(RestApplication parent) {
       this._parent = parent;
    }

	@GET
	@Produces("application/text")
	public String echoConfig() {
		return this._parent.getConfiguration().info();
	}
}