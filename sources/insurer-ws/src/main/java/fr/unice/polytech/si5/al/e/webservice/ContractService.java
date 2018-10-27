package fr.unice.polytech.si5.al.e.webservice;


import holderObjects.ContractAdderHolder;
import holderObjects.ContractUpdateHolder;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/contracts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ContractService {

    @POST
    Response addContract(ContractAdderHolder holder);

    @PUT
    Response updateContractDescription(ContractUpdateHolder holder);
}
