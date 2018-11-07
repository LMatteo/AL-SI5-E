package fr.unice.polytech.si5.al.e;


import fr.unice.polytech.si5.al.e.components.PathServiceBean;
import fr.unice.polytech.si5.al.e.messageReceiver.MessageReceiver;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Item;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.travelValidator.ValidatorBean;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.transaction.api.annotation.TransactionMode;
import org.jboss.arquillian.transaction.api.annotation.Transactional;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.ClassLoaderAsset;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import javax.ejb.EJB;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@RunWith(Arquillian.class)
@Transactional(TransactionMode.COMMIT)
public class ControlTravelTest {
    @PersistenceContext
    private EntityManager entityManager;

    @EJB
    private ControlTravel controlTravel;

    private Customer christophe;
    private Customer johan;
    private Travel travelA;
    private Item itemA;

    @Deployment
    public static WebArchive createDeployment() {
        return ShrinkWrap.create(WebArchive.class)
                .addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
                // Message-Driven beans
                .addPackage(PathServiceBean.class.getPackage())
                .addPackage(Travel.class.getPackage())
                .addPackage(Customer.class.getPackage())
                .addPackage(Item.class.getPackage())
                .addPackage(MessageReceiver.class.getPackage())
                .addPackage(ValidatorBean.class.getPackage())
                // Persistence file
                .addAsManifestResource(new ClassLoaderAsset("META-INF/persistence.xml"), "persistence.xml");
    }

    @Before
    public void setup() {
        christophe = new Customer();
        christophe.setName("christophe");
        entityManager.persist(christophe);

        johan = new Customer();
        johan.setName("johan");
        entityManager.persist(johan);

        travelA = new Travel();
        travelA.setCustomer(christophe);
        travelA.setDeparture("startA");
        travelA.setDestination("endA");
        entityManager.persist(travelA);

        itemA = new Item();
        itemA.setName("itemA");
        entityManager.persist(itemA);
    }

    @After
    public void cleanup() {
        entityManager.remove(christophe);
        christophe = null;

        entityManager.remove(johan);
        johan = null;

        entityManager.remove(travelA);
        travelA = null;

        entityManager.remove(itemA);
        itemA = null;

    }

    @Test
    public void createTravelTest() {
        Travel travel1 = controlTravel.createTravel("christophe", "startpoint", "endpoint");
        Travel travel2 = entityManager.merge(travel1);
        assertEquals(travel1, travel2);
        assertEquals(christophe, travel2.getCustomer());
        assertEquals("startpoint", travel2.getDeparture());
        assertEquals("endpoint", travel2.getDestination());
        entityManager.remove(travel1);
    }

    @Test
    public void addItemToTravelTest() {
        Travel travel1 = controlTravel.addItemToTravel(itemA, Integer.toString(travelA.getId()));
        Travel travel2 = entityManager.merge(travel1);

        assertEquals(travelA, travel1);
        assertEquals(travel1, travel2);
        assertEquals(christophe, travel2.getCustomer());
        assertEquals(travel1.getDeparture(), travel2.getDeparture());
        assertEquals(travel1.getDestination(), travel2.getDestination());
        assertTrue(travel2.getItems().contains(itemA));
        assertTrue(travel2.getCustomer().getItems().contains(itemA));
    }


    @Test
    public void findTravelTest() {
        List<Travel> travels = controlTravel.findTravel("startA", "endA");
        assertEquals(1, travels.size());

        controlTravel.createTravel("christophe", "startA", "endA");
        List<Travel> travels2 = controlTravel.findTravel("startA", "endA");
        assertEquals(2, travels2.size());

        controlTravel.createTravel("christophe", "startB", "endB");
        List<Travel> travels3 = controlTravel.findTravel("startA", "endA");
        List<Travel> travels4 = controlTravel.findTravel("startB", "endB");
        assertEquals(2, travels3.size());
        assertEquals(1, travels4.size());


    }

    @Test
    public void chooseTravelTest() {
        Travel travel1 = controlTravel.chooseTravel("johan", Integer.toString(travelA.getId()));
        Travel travel2 = entityManager.merge(travel1);
        assertEquals(travelA, travel1);
        assertEquals(travel1, travel2);
        assertEquals(christophe, travel2.getCustomer());
        assertEquals(johan, travel2.getTransporter());
        assertEquals(travel1.getDeparture(), travel2.getDeparture());
        assertEquals(travel1.getDestination(), travel2.getDestination());

    }

    @Test
    public void finishTravel() {
        controlTravel.finishTravel(Integer.toString(travelA.getId()));
    }
}
