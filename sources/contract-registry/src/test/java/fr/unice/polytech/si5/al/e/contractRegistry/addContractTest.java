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
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.ejb.EJB;
import java.util.Collection;
import java.util.List;

@RunWith(Arquillian.class)
public class addContractTest {

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

    @Test
    public void test(){

        Contract contract = handleContract.addContract(Types.FRAGILE,"salut","salut");
        Contract contract1 = handleContract.addContract(Types.FRAGILE,"salut","salut");
        Contract contract2 = handleContract.addContract(Types.FRAGILE,"salut","salut");
        Contract contract3 = handleContract.addContract(Types.FRAGILE,"salut","salut");
        Contract contract4 = handleContract.addContract(Types.FRAGILE,"salut","salut");
        Collection<Contract> contracts = listContract.getContractByType(Types.FRAGILE);

        Assert.assertEquals(contracts.size(),5);
    }


}
