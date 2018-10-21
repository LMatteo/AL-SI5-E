package fr.unice.polytech.si5.al.e.contractRegistry;


import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.HandleContract;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.model.Contact;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Stateless
public class ContractRegistryBean implements HandleContract, ListContract {

    @PersistenceContext
    private EntityManager manager;



    @Override
    public Collection<Contract> getContractByType(Types type) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Contract> criteria = builder.createQuery(Contract.class);
        Root<Contract> root =  criteria.from(Contract.class);

        //criteria.select(root).where(builder.equal(root.get("name"), name));
        TypedQuery<Contract> query = manager.createQuery(criteria);

        List<Contract> contracts = query.getResultList();
        return contracts;

    }

    @Override
    public Contract addContract(Types type, String description, String mail) {
        Contract contract = new Contract();

        contract.setDescription(description);
        contract.setType(type);
        contract.setContact(new Contact(mail));

        manager.persist(contract);

        return contract;
    }

    @Override
    public Contract updateContractDescription(int id, String description) {
        return null;
    }
}
