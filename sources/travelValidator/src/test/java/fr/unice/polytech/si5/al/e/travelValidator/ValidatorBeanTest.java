package fr.unice.polytech.si5.al.e.travelValidator;

import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.model.Validator;
import fr.unice.polytech.si5.al.e.model.type.Types;
import fr.unice.polytech.si5.al.e.travelValidator.ValidatorBean;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.ClassLoaderAsset;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.ejb.EJB;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RunWith(Arquillian.class)
public class ValidatorBeanTest {

    @PersistenceContext
    private EntityManager manger;

    @EJB
    private InsuranceValidate insuranceValidate;

    @EJB
    private PathValidate pathValidate;

    private Travel travel;


    @Deployment
    public static WebArchive createDeployment() {
        return ShrinkWrap.create(WebArchive.class)
                .addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
                .addPackage(ValidatorBean.class.getPackage())
                .addPackage(Travel.class.getPackage())
                .addPackage(Validator.class.getPackage())
                // Persistence file
                .addAsManifestResource(new ClassLoaderAsset("META-INF/persistence.xml"), "persistence.xml");
    }

    @Before
    public void init(){
        this.travel = new Travel();
        travel.setDestination("sal");
        travel.setDeparture("sal");
    }

    @Test
    public void insuranceValidationTest(){

        travel = insuranceValidate.insuranceValidate(travel);

        Assert.assertFalse(travel.getValidator().isValid());

        travel = pathValidate.pathValidate(travel);

        Assert.assertTrue(travel.getValidator().isValid());

    }





}
