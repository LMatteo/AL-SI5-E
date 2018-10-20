package fr.unice.polytech.si5.aal.e;


import fr.unice.polytech.si5.aal.e.interfaces.HandleContract;
import fr.unice.polytech.si5.aal.e.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.ejb.Stateless;
import java.util.Collection;

@Stateless
public class ContractSubBean implements HandleContract, ListContract {


    @Override
    public Collection<Contract> getContractByType(Types type) {
        return null;
    }

    @Override
    public Contract addContract(Types type, String description, String mail) {
        return null;
    }

    @Override
    public Contract updateContractDescription(int id, String description) {
        return null;
    }
}
