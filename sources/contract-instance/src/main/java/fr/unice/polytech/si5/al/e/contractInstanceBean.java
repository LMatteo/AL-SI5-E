package fr.unice.polytech.si5.al.e;


import fr.unice.polytech.si5.al.e.interfaces.FinishContract;
import fr.unice.polytech.si5.al.e.interfaces.Subscribe;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.ContractSubscription;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.Collection;
import java.util.List;

@Stateless
public class contractInstanceBean implements Subscribe, FinishContract {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public Collection<ContractSubscription> getContract() {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<ContractSubscription> criteria = builder.createQuery(ContractSubscription.class);
        TypedQuery<ContractSubscription> query = manager.createQuery(criteria);
        List<ContractSubscription> contracts = query.getResultList();
        return contracts;
    }



    @Override
    public ContractSubscription subscribeToContract(Customer customer, Contract contract) {
        ContractSubscription contractSubscription = new ContractSubscription();
        contractSubscription.setCustomer(customer);
        contractSubscription.setContract(contract);
        manager.persist(contractSubscription);
        return contractSubscription;
    }

    @Override
    public void cancelSubscritpion(ContractSubscription subscription) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<ContractSubscription> criteria = builder.createQuery(ContractSubscription.class);
        TypedQuery<ContractSubscription> query = manager.createQuery(criteria);
        List<ContractSubscription> contracts = query.getResultList();
        for(ContractSubscription contract : contracts){
            if(contract.getId() == subscription.getId()){
                manager.remove(contract);
            }
        }
    }


    @Override
    public void clear() {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<ContractSubscription> criteria = builder.createQuery(ContractSubscription.class);
        TypedQuery<ContractSubscription> query = manager.createQuery(criteria);
        List<ContractSubscription> contracts = query.getResultList();
        for(ContractSubscription contract : contracts){
            manager.remove(contract);
        }
    }

    @Override
    public void finishTravel(Travel travel) {
        // TODO
    }

}
