package fr.unice.polytech.si5.al.e.webservice.interfaces;

import fr.unice.polytech.si5.al.e.webservice.holderObjets.ContractAdderHolder;
import fr.unice.polytech.si5.al.e.webservice.holderObjets.ContractUpdateHolder;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/contracts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ContractsWebService {

    @POST
    Response addContract(ContractAdderHolder holder);

    @PUT
    Response updateContractDescription(ContractUpdateHolder holder);

    @GET
    @Path("{type}")
    Response getContractByType(@PathParam("type")String typeName);
}
