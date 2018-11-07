package fr.unice.polytech.si5.al.e.webservice;

import com.google.gson.Gson;
import fr.unice.polytech.si5.al.e.ControlTravel;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.interfaces.Subscribe;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.exceptions.NoSuchContractIdException;
import fr.unice.polytech.si5.al.e.model.exceptions.NoSuchCustomerIdException;
import fr.unice.polytech.si5.al.e.webservice.Objects.ContractCancelObject;
import fr.unice.polytech.si5.al.e.webservice.Objects.ContractSubscribeObject;
import fr.unice.polytech.si5.al.e.webservice.interfaces.SubscribeService;

import javax.ejb.EJB;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SubscribeWebServiceImpl implements SubscribeService {

    @EJB
    private Subscribe subscriber;

    @EJB
    private ListContract contractLister;

    @EJB
    private ControlTravel traveler;

    private static final Logger log = Logger.getLogger(Logger.class.getName());


    @Override
    public Response getContract() {
        return Response.ok(new Gson().toJson(Collections.singletonList(new Contract()))).build();
    }

    @Override
    public Response subscribeToContract(ContractSubscribeObject obj) {
        try {
            Customer customer = traveler.getCustomerById(obj.getIdCustomer());
            Contract contract = contractLister.getContractById(obj.getIdContract());

            log.log(Level.WARNING,"SUBSCRIBING CUSTOMER ID " + customer.getId() + " TO CONTRACT ID : " + contract.getId());

            subscriber.subscribeToContract(customer,contract);

            return Response.ok("{\"status\" : \"OK\"").build();
        } catch (NoSuchCustomerIdException e){
            return Response.status(400).entity("No such customer id found").build();
        } catch (NoSuchContractIdException e) {
            return Response.status(400).entity("No such contract id found").build();
        }
    }

    @Override
    public Response cancelSubscritpion(ContractCancelObject obj) {



        return Response.ok("Ok").build();
    }
}
