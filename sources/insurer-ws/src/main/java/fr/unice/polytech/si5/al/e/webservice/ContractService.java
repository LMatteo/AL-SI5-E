package fr.unice.polytech.si5.al.e.webservice;


import fr.unice.polytech.si5.al.e.webservice.holderObjects.ContractAdderHolder;
import fr.unice.polytech.si5.al.e.webservice.holderObjects.ContractUpdateHolder;

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
