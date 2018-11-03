package fr.unice.polytech.si5.al.e.webservice;

import com.google.gson.Gson;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.webservice.Objects.ContractCancelObject;
import fr.unice.polytech.si5.al.e.webservice.Objects.ContractSubscribeObject;
import fr.unice.polytech.si5.al.e.webservice.interfaces.SubscribeService;

import javax.ws.rs.core.Response;
import java.util.Collections;

public class SubscribeWebServiceImpl implements SubscribeService {
    @Override
    public Response getContract() {
        return Response.ok(new Gson().toJson(Collections.singletonList(new Contract()))).build();
    }

    @Override
    public Response subscribeToContract(ContractSubscribeObject obj) {
        return Response.ok("Ok").build();
    }

    @Override
    public Response cancelSubscritpion(ContractCancelObject obj) {
        return Response.ok("Ok").build();
    }
}
