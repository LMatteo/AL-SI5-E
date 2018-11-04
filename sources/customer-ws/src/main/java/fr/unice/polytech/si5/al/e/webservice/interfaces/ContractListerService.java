package fr.unice.polytech.si5.al.e.webservice.interfaces;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/contracts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ContractListerService {
    @GET
    @Path("{type}")
    Response getContractByType(@PathParam("type") String type);
}
