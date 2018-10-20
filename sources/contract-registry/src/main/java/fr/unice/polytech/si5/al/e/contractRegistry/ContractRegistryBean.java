package fr.unice.polytech.si5.al.e.contractRegistry;


import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.HandleContract;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;

@Stateless
public class ContractRegistryBean implements HandleContract, ListContract {

    @PersistenceContext
    private EntityManager manager;



    @Override
    public Collection<Contract> getContractByType(Types type) {
        return null;
    }

    @Override
    public Contract addContract(Types type, String description, String mail) {
        Contract contract = new Contract();

            contract.setDescription(description);
        contract.setType(type);

        manager.persist(contract);

        return contract;
    }

    @Override
    public Contract updateContractDescription(int id, String description) {
        return null;
    }
}
