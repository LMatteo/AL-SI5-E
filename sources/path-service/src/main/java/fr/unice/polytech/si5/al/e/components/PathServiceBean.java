package fr.unice.polytech.si5.al.e.components;

import fr.unice.polytech.si5.al.e.ControlTravel;
import fr.unice.polytech.si5.al.e.interfaces.GetContract;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Item;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.model.exceptions.NoSuchCustomerIdException;
import fr.unice.polytech.si5.al.e.travelValidator.PathValidate;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.jms.*;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateless
public class PathServiceBean implements ControlTravel {
    @EJB
    private GetContract ContractInstance;

    private static final Logger log = Logger.getLogger(Logger.class.getName());

    @EJB
    private PathValidate validator;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Travel createTravel(String customerName, String departure, String destination) {
        Customer customer;
        List<Customer> customers = findEntityByName(Customer.class, customerName);
        if (customers.isEmpty()) {
            customer = new Customer();
            customer.setName(customerName);
            entityManager.persist(customer);
        } else {
            customer = customers.get(0);
        }
        Travel travel = new Travel();
        travel.setCustomer(customer);
        travel.setDeparture(departure);
        travel.setDestination(destination);
        customer.addTravel(travel);
        entityManager.merge(customer);
        entityManager.persist(travel);
        validator.pathValidate(travel);

        try {
            send("VALIDATION", travel);
        } catch (Exception e) {
            log.log(Level.WARNING, e.toString());
        }

        return travel;
    }

    @Override
    public Travel addItemToTravel(Item item, String travelId) {
        Travel travel = entityManager.find(Travel.class, travelId);
        travel.addItem(item);
        travel.getCustomer().addItem(item);
        entityManager.merge(travel);
        return travel;
    }

    @Override
    public List<Travel> findTravel(String departure, String destination) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Travel> criteria = builder.createQuery(Travel.class);
        Root<Travel> root = criteria.from(Travel.class);

        criteria.select(root).where(builder.and(builder.like(root.get("departure"), "%" + departure + "%"), builder.like(root.get("destination"), "%" + destination + "%")));
        TypedQuery<Travel> query = entityManager.createQuery(criteria);
        return query.getResultList();
    }

    @Override
    public List<Travel> findTravel() {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Travel> criteria = builder.createQuery(Travel.class);
        Root<Travel> root = criteria.from(Travel.class);

        criteria.select(root);
        TypedQuery<Travel> query = entityManager.createQuery(criteria);
        return query.getResultList();
    }

    @Override
    public Travel findTravelById(String travelId) {
        return entityManager.find(Travel.class, travelId);
    }

    @Override
    public Travel chooseTravel(String transporterName, String travelId) {
        Customer transporter;
        List<Customer> transporters = findEntityByName(Customer.class, transporterName);
        if (transporters.isEmpty()) {
            transporter = new Customer();
            transporter.setName(transporterName);
            entityManager.persist(transporter);
        } else {
            transporter = transporters.get(0);
        }
        entityManager.merge(transporter);
        Travel travel = entityManager.find(Travel.class, travelId);
        entityManager.merge(travel);
        travel.setTransporter(transporter);
        transporter.chooseTravel(travel);
        entityManager.merge(transporter);
        validator.pathValidate(travel);

        try {
            send("VALIDATION", travel);
        } catch (Exception e) {
            log.log(Level.WARNING, e.toString());
        }

        return travel;
    }

    @Override
    public void finishTravel(String travelId) {
        Travel travel = entityManager.find(Travel.class, travelId);
        try {
            send("VALIDATION", travel);
        } catch (Exception e) {
            log.log(Level.WARNING, e.toString());
        }
    }

    @Override
    public Customer getCustomerById(int id) throws NoSuchCustomerIdException {
        try {
            CriteriaBuilder builder = entityManager.getCriteriaBuilder();

            CriteriaQuery<Customer> criteria = builder.createQuery(Customer.class);
            Root<Customer> root = criteria.from(Customer.class);

            criteria.select(root).where(builder.equal(root.get("id"), id));
            TypedQuery<Customer> query = entityManager.createQuery(criteria);
            return query.getSingleResult();
        } catch (Exception e){
            throw new NoSuchCustomerIdException();
        }
    }

    private <T> List<T> findEntityByName(Class<T> clazz, String name) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();

        CriteriaQuery<T> criteria = builder.createQuery(clazz);
        Root<T> root = criteria.from(clazz);

        criteria.select(root).where(builder.like(root.get("name"), "%" + name + "%"));
        TypedQuery<T> query = entityManager.createQuery(criteria);
        return query.getResultList();
    }

    @Resource
    private ConnectionFactory connectionFactory;
    @Resource(name = "MessageReceiver")
    private Queue acknowledgmentQueue;


    private void send(String goal, Travel travel) throws JMSException {
        Connection connection = null;
        Session session = null;
        try {
            connection = connectionFactory.createConnection();
            connection.start();
            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

            MessageProducer producer = session.createProducer(acknowledgmentQueue);


            producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
            producer.send(session.createTextMessage(Integer.toString(travel.getId())));
        } finally {
            if (session != null)
                session.close();
            if (connection != null)
                connection.close();
        }
    }
}
