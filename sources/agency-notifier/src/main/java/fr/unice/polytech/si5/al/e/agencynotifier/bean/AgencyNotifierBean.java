package fr.unice.polytech.si5.al.e.agencynotifier.bean;

import fr.unice.polytech.si5.al.e.agencynotifier.interfaces.Notify;
import fr.unice.polytech.si5.al.e.agencynotifier.interfaces.RegisterInsurer;
import fr.unice.polytech.si5.al.e.model.*;

import javax.ejb.Stateful;
import java.util.HashMap;
import java.util.Map;

@Stateful
public class AgencyNotifierBean implements Notify, RegisterInsurer {
    private static final Map<Integer,Contact> contacts = new HashMap<>();
    @Override
    public void registerInsurerContact(Contract contract) {
        contacts.put(contract.getId(), contract.getContact());
        System.out.println("AgencyNotifier : Contract added : " + contract);
    }

    @Override
    public void updateInsurerContact(Contract newContract) {
        contacts.replace(newContract.getId(), newContract.getContact());
        System.out.println("AgencyNotifier : Contract updated : " + newContract);

    }

    @Override
    public void notifyContractReport(ContractSubscription contractSubscription, ItineraryStatus status) {
        int contractId = contractSubscription.getContract().getId();
        Contact contact = contacts.get(contractId);
        System.out.println("AgencyNotifier : send notification to "+ contact.getMail() + " for subscription "+ contractSubscription);
    }

    @Override
    public void notifyContractReport(Customer customer, Contract contract, Travel travel) {
        int contractId = contract.getId();
        Contact contact = contacts.get(contractId);
        System.out.println("AgencyNotifier : send notification to "+ contact.getMail());
    }

    @Override
    public void notifyContractRegister(ContractSubscription newSubscription) {
        int contractId = newSubscription.getContract().getId();
        Contact contact = contacts.get(contractId);
        System.out.println("AgencyNotifier : send notification to "+ contact.getMail() + " for new subscription "+ newSubscription);

    }
}
