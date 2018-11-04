package fr.unice.polytech.si5.al.e.insuranceValidator;

import fr.unice.polytech.si5.al.e.ContractInstanceBean;
import fr.unice.polytech.si5.al.e.agencynotifier.bean.AgencyNotifierBean;
import fr.unice.polytech.si5.al.e.agencynotifier.interfaces.RegisterInsurer;
import fr.unice.polytech.si5.al.e.interfaces.Subscribe;
import fr.unice.polytech.si5.al.e.model.Contact;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.model.type.Type;
import fr.unice.polytech.si5.al.e.travelValidator.PathValidate;
import fr.unice.polytech.si5.al.e.travelValidator.ValidatorBean;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.transaction.api.annotation.TransactionMode;
import org.jboss.arquillian.transaction.api.annotation.Transactional;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.ClassLoaderAsset;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.*;
import org.junit.runner.RunWith;

import javax.ejb.EJB;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RunWith(Arquillian.class)
@Transactional(TransactionMode.COMMIT)
public class ValidatorTest {

    @PersistenceContext
    private EntityManager memory;

    @EJB
    private Subscribe sub;

    @EJB
    private Validate validate;


    @EJB
    private RegisterInsurer register;

    @EJB
    private PathValidate pathValidator;



    private static Customer moved;
    private static Customer transporter;

    private Contract movedContract;
    private Contract transporterContract;

    @Deployment
    public static WebArchive createDeployment() {
        return ShrinkWrap.create(WebArchive.class)
                .addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
                .addPackage(ContractInstanceBean.class.getPackage())
                .addPackage(AgencyNotifierBean.class.getPackage())
                .addPackage(ValidatorBean.class.getPackage())
                .addPackage(Contract.class.getPackage())
                .addPackage(InsuranceValidatorBean.class.getPackage())
                .addPackage(Customer.class.getPackage())
                .addPackage(Travel.class.getPackage())
                // Persistence file
                .addAsManifestResource(new ClassLoaderAsset("META-INF/persistence.xml"), "persistence.xml");
    }

    @Before
    public void setup(){
        moved = new Customer();
        moved.setName("moved");
        memory.persist(moved);

        transporter = new Customer();
        transporter.setName("transported");
        memory.persist(transporter);

        movedContract = new Contract();
        movedContract.setDescription("salut");
        movedContract.setContact(new Contact("salut.hello"));
        movedContract.setType(Type.FRAGILE);
        memory.persist(movedContract);

        register.registerInsurerContact(movedContract);

        transporterContract = new Contract();
        transporterContract.setDescription("tran");
        transporterContract.setContact(new Contact("tran.hello"));
        transporterContract.setType(Type.HEAVY);
        memory.persist(transporterContract);

        register.registerInsurerContact(transporterContract);
    }

    @After
    public void cleanup(){
        sub.clear();

        memory.remove(moved);
        memory.remove(movedContract);
        memory.remove(transporter);
        memory.remove(transporterContract);
    }

    @Test
    public void validationTest(){
        sub.subscribeToContract(moved,movedContract);

        sub.subscribeToContract(transporter,transporterContract);

        Travel travel = new Travel();
        travel.setDestination("sa");
        travel.setDeparture("he");

        travel.setCustomer(moved);
        travel.setTransporter(transporter);



        validate.validate(travel);

        pathValidator.pathValidate(travel);

        Assert.assertTrue(travel.getValidator().isValid());
    }

    @Test
    public void failValidationTest(){
        sub.subscribeToContract(transporter,transporterContract);

        Travel travel = new Travel();
        travel.setDestination("sa");
        travel.setDeparture("he");

        travel.setCustomer(moved);
        travel.setTransporter(transporter);



        validate.validate(travel);

        pathValidator.pathValidate(travel);
        Assert.assertFalse(travel.getValidator().isValid());


    }


}
