package fr.unice.polytech.si5.al.e.webservice;

import fr.unice.polytech.si5.al.e.model.Constraint;
import fr.unice.polytech.si5.al.e.model.Contact;
import fr.unice.polytech.si5.al.e.model.Contract;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import java.util.Collections;
import java.util.List;

@Path("/customer")
public class CustomerWebServiceImpl {

    /* example of ejb dependency injection
    @EJB
    public ListContract listContract;
     */

    @POST
    public List<Contract> listContracts(List<Constraint> constraints) {
        // return listContract.listContracts(constraints);
        return Collections.singletonList(new Contract(12,new Contact("contact@insurer.com")));
    }
}
