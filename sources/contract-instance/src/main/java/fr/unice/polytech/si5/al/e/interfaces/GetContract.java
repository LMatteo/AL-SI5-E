package fr.unice.polytech.si5.al.e.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.ContractSubscription;
import fr.unice.polytech.si5.al.e.model.Customer;

import javax.ejb.Local;
import java.util.Collection;

@Local
public interface GetContract {
    Collection<ContractSubscription> getContract();
    Collection<Contract> getContractByCustomer(Customer customer);

}
