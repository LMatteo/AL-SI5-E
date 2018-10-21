package fr.unice.polytech.si5.al.e.contractRegistry;


import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.HandleContract;
import fr.unice.polytech.si5.al.e.contractRegistry.interfaces.ListContract;
import fr.unice.polytech.si5.al.e.model.Contract;
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
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@RunWith(Arquillian.class)
public class HandleContractTest {


    @EJB
    private HandleContract handleContract;

    @EJB
    private ListContract listContract;


    @Deployment
    public static WebArchive createDeployment() {
        return ShrinkWrap.create(WebArchive.class)
                .addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml")
                // Message-Driven beans
                .addPackage(ContractRegistryBean.class.getPackage())
                .addPackage(Contract.class.getPackage())
                // Persistence file
                .addAsManifestResource(new ClassLoaderAsset("META-INF/persistence.xml"), "persistence.xml");
    }

    @Before
    @After
    public void cleanup(){
        handleContract.clear();
    }

    @Test
    public void addingAndListingTest(){

        Contract contract = handleContract.addContract(Types.FRAGILE,"salut","salut");
        Contract contract1 = handleContract.addContract(Types.FRAGILE,"salut","salut");

        Collection<Contract> contracts = listContract.getContractByType(Types.FRAGILE);

        Assert.assertEquals(2,contracts.size());
        Assert.assertEquals(0,listContract.getContractByType(Types.HEAVY).size());


    }

    @Test
    public void updatingTest(){
        Contract contract = handleContract.addContract(Types.FRAGILE,"salut","salut");

        List<Contract> contracts = new ArrayList<>(listContract.getContractByType(Types.FRAGILE));

        Assert.assertEquals(contracts.size(),1);

        Contract persistingContract = contracts.get(0);
        Assert.assertEquals(persistingContract.getDescription(),contract.getDescription());

        handleContract.updateContractDescription(persistingContract.getId(),"changement");

        contracts = new ArrayList<>(listContract.getContractByType(Types.FRAGILE));
        Assert.assertEquals(contracts.size(),1);
        persistingContract = contracts.get(0);

        Assert.assertEquals("changement",persistingContract.getDescription());
    }


}
