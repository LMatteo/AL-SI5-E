package fr.unice.polytech.si5.al.e.webservice;

import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.HandleContract;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.exceptions.HttpException;
import fr.unice.polytech.si5.al.e.model.type.Types;
import fr.unice.polytech.si5.al.e.webservice.holderObjets.ContractAdderHolder;
import fr.unice.polytech.si5.al.e.webservice.holderObjets.ContractHolder;
import fr.unice.polytech.si5.al.e.webservice.holderObjets.ContractUpdateHolder;
import fr.unice.polytech.si5.al.e.webservice.interfaces.ContractsWebService;

import javax.ejb.EJB;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;


public class ContractsWebServiceImpl implements ContractsWebService {

    @EJB
    private HandleContract handleContract;

    @EJB
    private ListContract listContract;

    private static final Logger log = Logger.getLogger(Logger.class.getName());


    @Override
    public Response addContract(ContractAdderHolder holder) {
        log.log(Level.INFO,"new contract to add " + holder.getTypeName()+ " " + holder.getDescription()+ " " + holder.getMail() );

        try {
            Types type = Types.getTypeFromString(holder.getTypeName());
            Contract contract = handleContract.addContract(type, holder.getDescription(), holder.getMail());
            ContractHolder responseHolder = new ContractHolder(contract.getId(), contract.getContact().getMail(), contract.getDescription());
            return Response.ok(responseHolder.toJson()).build();
        }catch (HttpException e){
            log.log(Level.SEVERE,"EXCEPTION THROWN");
            log.log(Level.SEVERE,e.toString());
            return Response.status(e.getHttpReturnCode()).entity(e.getMessage()).build();
        }


    }

    @Override
    public Response updateContractDescription(ContractUpdateHolder holder) {
        try {
            Contract contract = handleContract.updateContractDescription(holder.getId(),holder.getDescription());
            ContractHolder contractHolder =  new ContractHolder(contract.getId(),contract.getContact().getMail(),contract.getDescription());
            return Response.ok(contractHolder.toJson()).build();
        } catch (HttpException e) {
            log.log(Level.SEVERE,"EXCEPTION THROWN");
            log.log(Level.SEVERE,e.toString());
            return Response.status(e.getHttpReturnCode()).entity(e.getMessage()).build();
        }


    }

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
            log.log(Level.SEVERE,"EXCEPTION THROWN");
            log.log(Level.SEVERE,e.toString());
            return Response.status(e.getHttpReturnCode()).entity(e.getMessage()).build();
        }
    }
}
