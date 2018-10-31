package fr.unice.polytech.si5.al.e.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.ContractSubscription;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.ejb.Local;
import java.util.Collection;

@Local
public interface Subscribe {
    Collection<ContractSubscription> getContract();
    ContractSubscription subscribeToContract(Customer customer, Contract contract);
    void cancelSubscritpion(ContractSubscription subscription);
    void clear();
}
