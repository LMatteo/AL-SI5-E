package fr.unice.polytech.si5.al.e.webservice.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import java.util.List;

@Path("/contracts")
public interface ContractsWebService {

    @POST
    Contract addContract(String typeName, String description, String mail);

    @PUT
    Contract updateContractDescription(int id,String newDescription);

    @GET
    List<Contract> getContractByType(String typeName);
}
