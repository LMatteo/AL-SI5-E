package fr.unice.polytech.si5.al.e.agencynotifier.interfaces;

import fr.unice.polytech.si5.al.e.model.ContractSubscription;
import fr.unice.polytech.si5.al.e.model.ItineraryStatus;

import javax.ejb.Local;

@Local
public interface Notify {

    void notifyContractReport(ContractSubscription contractSubscription, ItineraryStatus status);
    void notifyContractRegister( ContractSubscription newSubscribtion);
}
