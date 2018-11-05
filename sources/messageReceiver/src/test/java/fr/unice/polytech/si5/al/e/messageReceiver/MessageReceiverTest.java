package fr.unice.polytech.si5.al.e.messageReceiver;

import fr.unice.polytech.si5.al.e.ContractInstanceBean;
import fr.unice.polytech.si5.al.e.agencynotifier.bean.AgencyNotifierBean;
import fr.unice.polytech.si5.al.e.agencynotifier.interfaces.RegisterInsurer;
import fr.unice.polytech.si5.al.e.insuranceValidator.InsuranceValidatorBean;
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
import javax.jms.MessageListener;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Ignore
@RunWith(Arquillian.class)
@Transactional(TransactionMode.COMMIT)
public class MessageReceiverTest {

    @PersistenceContext
    private EntityManager manager;

    @EJB
    private MessageReceiver listener;

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






}
