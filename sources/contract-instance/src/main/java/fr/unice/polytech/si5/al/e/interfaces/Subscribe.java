package fr.unice.polytech.si5.al.e.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.ContractSubscription;
import fr.unice.polytech.si5.al.e.model.Customer;

import javax.ejb.Local;

@Local
public interface Subscribe {
    ContractSubscription subscribeToContract(Customer customer, Contract contract);
    void cancelSubscritpion(ContractSubscription subscription);
    void clear();
}
