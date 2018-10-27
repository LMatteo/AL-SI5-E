package fr.unice.polytech.si5.al.e.webservice;

import com.google.gson.Gson;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.exceptions.HttpException;
import fr.unice.polytech.si5.al.e.model.type.Types;
import fr.unice.polytech.si5.al.e.model.holderObject.ContractHolder;
import fr.unice.polytech.si5.al.e.webservice.interfaces.ContractListerService;

import javax.ejb.EJB;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


public class ContractListerServiceImpl implements ContractListerService {

    @EJB
    private ListContract listContract;

    private static final Logger log = Logger.getLogger(Logger.class.getName());

    @Override
    public Response getContractByType(String typeName) {
        try {
            List<Contract> contracts = new ArrayList<Contract>(listContract.getContractByType(Types.getTypeFromString(typeName)));
            List<ContractHolder> contractHolders = new ArrayList<>();

            for (Contract contract : contracts) {
                contractHolders.add(new ContractHolder(contract.getId(), contract.getContact().getMail(), contract.getDescription()));
            }
            return Response.ok(ContractHolder.toJson(contractHolders)).build();
        } catch (HttpException e){
            Gson gson = new Gson();
            log.log(Level.SEVERE,"EXCEPTION THROWN");
            log.log(Level.SEVERE,e.toString());
            return Response.status(e.getHttpReturnCode()).entity(gson.toJson(e.getMessage())).build();
        }
    }
}
