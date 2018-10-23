package fr.unice.polytech.si5.al.e.webservice;

import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.HandleContract;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Types;
import fr.unice.polytech.si5.al.e.webservice.interfaces.ContractsWebService;

import javax.ejb.EJB;
import java.util.ArrayList;
import java.util.List;


public class ContractsWebServiceImpl implements ContractsWebService {

    @EJB
    private HandleContract handleContract;

    @EJB
    private ListContract listContract;


    @Override
    public Contract addContract(String typeName, String description, String mail) {
        Types type = Types.getTypeFromString(typeName);

        return handleContract.addContract(type,description,mail);
    }

    @Override
    public Contract updateContractDescription(int id, String newDescription) {
        return handleContract.updateContractDescription(id,newDescription);
    }

    @Override
    public List<Contract> getContractByType(String typeName) {
        return new ArrayList<Contract>(listContract.getContractByType(Types.getTypeFromString(typeName)));
    }
}
