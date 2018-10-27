package fr.unice.polytech.si5.al.e.webservice;


import com.google.gson.Gson;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.HandleContract;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.exceptions.HttpException;
import fr.unice.polytech.si5.al.e.model.holderObject.ContractHolder;
import fr.unice.polytech.si5.al.e.model.type.Types;
import holderObjects.ContractAdderHolder;
import holderObjects.ContractUpdateHolder;

import javax.ejb.EJB;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ContractServiceImpl implements ContractService {

    private static final Logger log = Logger.getLogger(Logger.class.getName());


    @EJB
    private HandleContract handleContract;

    @Override
    public Response addContract(ContractAdderHolder holder) {
        log.log(Level.INFO,"new contract to add " + holder.getTypeName()+ " " + holder.getDescription()+ " " + holder.getMail() );

        try {
            Types type = Types.getTypeFromString(holder.getTypeName());
            Contract contract = handleContract.addContract(type, holder.getDescription(), holder.getMail());
            ContractHolder responseHolder = new ContractHolder(contract.getId(), contract.getContact().getMail(), contract.getDescription());
            return Response.ok(responseHolder.toJson()).build();
        }catch (HttpException e){
            Gson gson = new Gson();
            log.log(Level.SEVERE,"EXCEPTION THROWN");
            log.log(Level.SEVERE,e.toString());
            return Response.status(e.getHttpReturnCode()).entity(gson.toJson(e.getMessage())).build();
        }


    }

    @Override
    public Response updateContractDescription(ContractUpdateHolder holder) {
        try {
            Contract contract = handleContract.updateContractDescription(holder.getId(),holder.getDescription());
            ContractHolder contractHolder =  new ContractHolder(contract.getId(),contract.getContact().getMail(),contract.getDescription());
            return Response.ok(contractHolder.toJson()).build();
        } catch (HttpException e) {
            Gson gson = new Gson();
            log.log(Level.SEVERE,"EXCEPTION THROWN");
            log.log(Level.SEVERE,e.toString());
            return Response.status(e.getHttpReturnCode()).entity(gson.toJson(e.getMessage())).build();
        }


    }

}
