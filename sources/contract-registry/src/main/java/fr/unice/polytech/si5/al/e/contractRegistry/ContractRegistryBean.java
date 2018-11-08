package fr.unice.polytech.si5.al.e.contractRegistry;


import fr.unice.polytech.si5.al.e.agencynotifier.interfaces.RegisterInsurer;
import fr.unice.polytech.si5.al.e.model.exceptions.NoSuchContractIdException;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.HandleContract;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.model.Contact;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Type;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.Collection;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateless
public class ContractRegistryBean implements HandleContract, ListContract {

    @PersistenceContext
    private EntityManager manager;

    @EJB
    private RegisterInsurer register;

    private static final Logger log = Logger.getLogger(Logger.class.getName());


    @Override
    public Collection<Contract> getContractByType(Type type) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Contract> criteria = builder.createQuery(Contract.class);
        Root<Contract> root =  criteria.from(Contract.class);

        criteria.select(root).where(builder.equal(root.get("type"), type));
        TypedQuery<Contract> query = manager.createQuery(criteria);

        List<Contract> contracts = query.getResultList();
        return contracts;

    }

    @Override
    public Contract getContractById(int id) throws NoSuchContractIdException  {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Contract> criteria = builder.createQuery(Contract.class);
        Root<Contract> root =  criteria.from(Contract.class);

        criteria.select(root).where(builder.equal(root.get("id"), id));
        TypedQuery<Contract> query = manager.createQuery(criteria);

        try {
            Contract contract = query.getSingleResult();
            return contract;
        } catch (Exception e){
            throw new NoSuchContractIdException(400);
        }

    }

    @Override
    public Contract addContract(Type type, String description, String mail) {

        Contract contract = new Contract();
        log.log(Level.INFO,"NEW CONTRACT : type : " + type.name() + " description : " + description + " mail : "+mail );
        contract.setDescription(description);
        contract.setType(type);
        contract.setContact(new Contact(mail));

        manager.persist(contract);

        register.registerInsurerContact(contract);

        return contract;
    }

    @Override
    public Contract updateContractDescription(int id, String description) throws NoSuchContractIdException {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Contract> criteria = builder.createQuery(Contract.class);
        Root<Contract> root =  criteria.from(Contract.class);

        criteria.select(root).where(builder.equal(root.get("id"), id));
        TypedQuery<Contract> query = manager.createQuery(criteria);

        try{
            Contract contract = query.getSingleResult();
            contract.setDescription(description);
            manager.merge(contract);
            return contract;
        } catch (NoResultException e){
            throw new NoSuchContractIdException(400);
        }

    }

    @Override
    public void clear() {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<Contract> criteria = builder.createQuery(Contract.class);
        Root<Contract> root =  criteria.from(Contract.class);

        TypedQuery<Contract> query = manager.createQuery(criteria);

        List<Contract> contracts = query.getResultList();

        for(Contract contract : contracts){
            manager.remove(contract);
        }
    }
}
