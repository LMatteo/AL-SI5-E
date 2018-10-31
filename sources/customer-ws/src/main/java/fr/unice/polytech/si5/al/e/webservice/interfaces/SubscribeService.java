package fr.unice.polytech.si5.al.e.webservice.interfaces;

import fr.unice.polytech.si5.al.e.webservice.Objects.ContractCancelObject;
import fr.unice.polytech.si5.al.e.webservice.Objects.ContractSubscribeObject;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/subscribe")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface SubscribeService {

    @GET
    Response getContract();

    @POST
    Response subscribeToContract(ContractSubscribeObject obj);

    @PUT
    Response cancelSubscritpion(ContractCancelObject obj);
}
