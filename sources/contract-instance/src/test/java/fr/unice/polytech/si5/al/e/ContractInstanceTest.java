package fr.unice.polytech.si5.al.e;


import fr.unice.polytech.si5.al.e.interfaces.GetContract;
import fr.unice.polytech.si5.al.e.interfaces.Subscribe;
import fr.unice.polytech.si5.al.e.model.*;
import fr.unice.polytech.si5.al.e.model.type.Type;
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
import java.util.Collection;
import java.util.List;

@RunWith(Arquillian.class)
public class ContractInstanceTest {

    @EJB
    private GetContract contracter;

    @EJB
    private Subscribe subscribe;

    @Deployment
    public static WebArchive createDeployment() {
        return ShrinkWrap.create(WebArchive.class)
                .addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
                .addPackage(ContractInstanceBean.class.getPackage())
                .addPackage(Customer.class.getPackage())
                .addPackage(Travel.class.getPackage())
                // Persistence file
                .addAsManifestResource(new ClassLoaderAsset("META-INF/persistence.xml"), "persistence.xml");
    }

    @Before
    public void init(){
        subscribe.clear();
    }

    @After
    public void cleanup(){
        subscribe.clear();
    }

    @Test
    public void subscribeTest(){
        Customer customer = new Customer();
        customer.setName("salut");

        Contract contract = new Contract();
        contract.setType(Type.FRAGILE);
        contract.setContact(new Contact("salut"));
        contract.setDescription("salut");

        subscribe.subscribeToContract(customer,contract);

        Assert.assertEquals(1,contracter.getContract().size());

        for(ContractSubscription sub : contracter.getContract()){
            Assert.assertEquals(sub.getCustomer(),customer);
            Assert.assertEquals(sub.getContract(),contract);
        }
    }

    @Test
    public void getContractByClientTest(){
        Customer customer = new Customer();
        customer.setName("salut");

        Contract contract = new Contract();
        contract.setType(Type.FRAGILE);
        contract.setContact(new Contact("salut"));
        contract.setDescription("salut");

        Contract contract1 = new Contract();
        contract1.setType(Type.HEAVY);
        contract1.setContact(new Contact("Hello"));
        contract1.setDescription("Hello");

        subscribe.subscribeToContract(customer,contract);
        subscribe.subscribeToContract(customer,contract1);

        Assert.assertEquals(2,contracter.getContract().size());

        Collection<Contract> contracts = contracter.getContractByCustomer(customer);
        Assert.assertEquals(2,contracts.size());

        Assert.assertTrue(contracts.contains(contract));
        Assert.assertTrue(contracts.contains(contract1));
    }

}
