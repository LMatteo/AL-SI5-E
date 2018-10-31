package fr.unice.polytech.si5.al.e.contractInstance;


import fr.unice.polytech.si5.al.e.contractInstanceBean;
import fr.unice.polytech.si5.al.e.interfaces.FinishContract;
import fr.unice.polytech.si5.al.e.interfaces.Subscribe;
import fr.unice.polytech.si5.al.e.model.Contact;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.ContractSubscription;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.type.Types;
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
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RunWith(Arquillian.class)
public class HandleContractInstanceTest {


    @EJB
    private Subscribe SubcribeContract;

    @EJB
    private FinishContract finishContract;


    @Deployment
    public static WebArchive createDeployment() {
        return ShrinkWrap.create(WebArchive.class)
                .addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
                // Message-Driven beans
                .addPackage(contractInstanceBean.class.getPackage())
                .addPackage(ContractSubscription.class.getPackage())
                // Persistence file
                .addAsManifestResource(new ClassLoaderAsset("META-INF/persistence.xml"), "persistence.xml");
    }

    @Before
    @After
    public void cleanup(){
        SubcribeContract.clear();
    }

    @Test
    public void addingAndListingTest(){

        Contact momo = new Contact("momo");

        Contract contract1 = new Contract();
        contract1.setContact(momo);
        contract1.setType(Types.FRAGILE);
        contract1.setDescription("contrat de portable");

        Contract contract2 = new Contract();
        contract1.setContact(momo);
        contract1.setType(Types.HEAVY);
        contract1.setDescription("contrat de porc");



        Customer customer1 = new Customer();
        customer1.setName("ramires");

        Customer customer2 = new Customer();
        customer2.setName("JC");

        SubcribeContract.subscribeToContract(customer1, contract1);
        SubcribeContract.subscribeToContract(customer2, contract2);

        Collection<ContractSubscription> contracts = SubcribeContract.getContract();
        Assert.assertEquals(2,contracts.size());
    }

}
