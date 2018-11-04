package fr.unice.polytech.si5.al.e.agencynotifier.bean;

import fr.unice.polytech.si5.al.e.agencynotifier.Communicator;
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
        Communicator.sendToMailer("noreply@blablamove.fr",contract.getContact().getMail(),"The contract has been added" + contract);
    }

    @Override
    public void updateInsurerContact(Contract newContract) {
        contacts.replace(newContract.getId(), newContract.getContact());
        Communicator.sendToMailer("noreply@blablamove.fr",newContract.getContact().getMail(),"The contract has been updated "+ newContract.toString()) ;

    }

    @Override
    public void notifyContractReport(ContractSubscription contractSubscription, ItineraryStatus status) {
        int contractId = contractSubscription.getContract().getId();
        Contact contact = contacts.get(contractId);
        Communicator.sendToMailer("noreply@blablamove.fr",contact.getMail(),"The contract subscription" + contractSubscription +" has ended with status"+ status ) ;
    }

    @Override
    public void notifyContractReport(Customer customer, Contract contract, Travel travel) {
        int contractId = contract.getId();
        Contact contact = contacts.get(contractId);
        System.out.println("AgencyNotifier : send notification to "+ contact.getMail());
        Communicator.sendToMailer("noreply@blablamove.fr",contact.getMail(),"The contract" + contract +" on travel "+ travel + "\n customer : " + customer) ;

    }

    @Override
    public void notifyContractRegister(ContractSubscription newSubscription) {
        int contractId = newSubscription.getContract().getId();
        Contact contact = contacts.get(contractId);
        Communicator.sendToMailer("noreply@blablamove.fr",contact.getMail(),"The contract" + newSubscription.getContract() +" has been taken by customer " + newSubscription.getCustomer()) ;
    }
}
