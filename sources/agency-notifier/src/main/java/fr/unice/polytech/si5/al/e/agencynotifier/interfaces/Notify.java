package fr.unice.polytech.si5.al.e.agencynotifier.interfaces;

import fr.unice.polytech.si5.al.e.model.*;

import javax.ejb.Local;

@Local
public interface Notify {

    void notifyContractReport(ContractSubscription contractSubscription, ItineraryStatus status);
    void notifyContractReport(Customer customer, Contract contract, Travel travel);
    void notifyContractRegister( ContractSubscription newSubscribtion);
}
