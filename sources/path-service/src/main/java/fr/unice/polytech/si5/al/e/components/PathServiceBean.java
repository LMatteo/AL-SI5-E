package fr.unice.polytech.si5.al.e.components;

import fr.unice.polytech.si5.al.e.ControlTravel;
import fr.unice.polytech.si5.al.e.FinishContract;
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
    public Travel createTravel(Customer customer, String departure, String destination) {
        Travel travel = new Travel();
        travel.setCustomer(customer);
        travel.setStart(departure);
        travel.setEnd(destination);
        customer.addTravel(travel);
        entityManager.persist(travel);
        return travel;
    }

    @Override
    public Travel addItemToTravel(Item item, Travel travel) {
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
    public Travel chooseTravel(Customer transporter, Travel travel) {
        travel.setTransporter(transporter);
        transporter.chooseTravel(travel);
        entityManager.merge(travel);
        entityManager.merge(transporter);
        return travel;
    }

    @Override
    public void finishTravel(Travel travel) {
        ContractInstance.travelFinished(travel);
    }
}
