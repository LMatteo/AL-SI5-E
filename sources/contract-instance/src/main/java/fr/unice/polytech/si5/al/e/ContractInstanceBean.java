package fr.unice.polytech.si5.al.e;


import fr.unice.polytech.si5.al.e.interfaces.GetContract;
import fr.unice.polytech.si5.al.e.interfaces.Subscribe;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.ContractSubscription;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.model.holderObject.MessageHolder;
import fr.unice.polytech.si5.al.e.model.type.MessageType;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.jms.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateless
public class ContractInstanceBean implements Subscribe, GetContract {

    @PersistenceContext
    private EntityManager manager;

    private static final Logger log = Logger.getLogger(Logger.class.getName());


    @Override
    public Collection<ContractSubscription> getContract() {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<ContractSubscription> criteria = builder.createQuery(ContractSubscription.class);
        Root<ContractSubscription> root =  criteria.from(ContractSubscription.class);
        TypedQuery<ContractSubscription> query = manager.createQuery(criteria);
        List<ContractSubscription> contracts = query.getResultList();
        return contracts;
    }

    @Override
    public Collection<Contract> getContractByCustomer(Customer customer) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<ContractSubscription> criteria = builder.createQuery(ContractSubscription.class);

        Root<ContractSubscription> root =  criteria.from(ContractSubscription.class);
        criteria.select(root).where(builder.equal(root.get("customer"),customer));

        TypedQuery<ContractSubscription> query = manager.createQuery(criteria);
        List<ContractSubscription> contracts = query.getResultList();

        List<Contract> res = new ArrayList<>();

        for(ContractSubscription subs : contracts){
            res.add(subs.getContract());
        }

        return res;
    }


    @Override
    public ContractSubscription subscribeToContract(Customer customer, Contract contract) {
        ContractSubscription contractSubscription = new ContractSubscription();
        contractSubscription.setCustomer(customer);
        contractSubscription.setContract(contract);
        manager.persist(contractSubscription);

        if(customer.getShipments() != null) {
            for (Travel travel : customer.getShipments()) {
                try {
                    send(MessageType.VALIDATION, travel);
                } catch (Exception e) {
                    log.log(Level.WARNING, "CANNOT SEND TRAVEL FOR VALIDATION IN SUBSCRIPTION");
                }
            }
        }

        if(customer.getTransports() != null) {
            for (Travel travel : customer.getTransports()) {
                try {
                    send(MessageType.VALIDATION, travel);
                } catch (Exception e) {
                    log.log(Level.WARNING, "CANNOT SEND TRAVEL FOR VALIDATION IN SUBSCRIPTION");
                }
            }
        }

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
        Root<ContractSubscription> root =  criteria.from(ContractSubscription.class);

        TypedQuery<ContractSubscription> query = manager.createQuery(criteria);
        List<ContractSubscription> contracts = query.getResultList();
        for(ContractSubscription contract : contracts){
            manager.remove(contract);
        }
    }

    @Resource
    private ConnectionFactory connectionFactory;
    @Resource(name = "/topic/TRAVEL_UPDATE")
    private Topic acknowledgmentQueue;


    private void send(MessageType type, Travel travel) throws JMSException {
        Connection connection = null;
        Session session = null;
        try {
            connection = connectionFactory.createConnection();
            connection.start();
            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

            MessageProducer producer = session.createProducer(acknowledgmentQueue);

            MessageHolder holder = new MessageHolder(type,travel.getId());
            producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
            producer.send(session.createTextMessage(holder.toJsonString()));
        } finally {
            if (session != null)
                session.close();
            if (connection != null)
                connection.close();
        }
    }

}
