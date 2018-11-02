package fr.unice.polytech.si5.al.e.components;

import fr.unice.polytech.si5.al.e.ControlTravel;
import fr.unice.polytech.si5.al.e.interfaces.FinishContract;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Item;
import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Stateless
public class PathServiceBean implements ControlTravel {
    @EJB
    private FinishContract ContractInstance;

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
        entityManager.persist(travel);
        return travel;
    }

    @Override
    public Travel addItemToTravel(Item item, String travelId) {
        Travel travel = findEntityById(Travel.class, travelId).get(0);
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

        criteria.select(root).where(builder.and(builder.like(root.get("start"), "%" + departure + "%"), builder.like(root.get("end"), "%" + destination + "%")));
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
    public Travel chooseTravel(String transporterName, String travelId) {
        Customer transporter;
        List<Customer> customers = findEntityByName(Customer.class, transporterName);
        if (customers.isEmpty()) {
            transporter = new Customer();
            transporter.setName(transporterName);
            entityManager.persist(transporter);
        } else {
            transporter = customers.get(0);
        }
        Travel travel = findEntityById(Travel.class, travelId).get(0);
        travel.setTransporter(transporter);
        transporter.chooseTravel(travel);
        entityManager.merge(travel);
        entityManager.merge(transporter);
        return travel;
    }

    @Override
    public void finishTravel(String travelId) {
        Travel travel = findEntityById(Travel.class, travelId).get(0);
        ContractInstance.finishTravel(travel);
    }

    private <T> List<T> findEntityByName(Class<T> clazz, String name) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();

        CriteriaQuery<T> criteria = builder.createQuery(clazz);
        Root<T> root = criteria.from(clazz);

        criteria.select(root).where(builder.like(root.get("name"), "%" + name + "%"));
        TypedQuery<T> query = entityManager.createQuery(criteria);
        return query.getResultList();
    }

    private <T> List<T> findEntityById(Class<T> clazz, String id) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();

        CriteriaQuery<T> criteria = builder.createQuery(clazz);
        Root<T> root = criteria.from(clazz);

        criteria.select(root).where(builder.like(root.get("id"), "%" + id + "%"));
        TypedQuery<T> query = entityManager.createQuery(criteria);
        return query.getResultList();
    }
}
