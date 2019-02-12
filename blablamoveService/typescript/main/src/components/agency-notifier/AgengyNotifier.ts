import { RegisterInsurer } from "./RegisterInsurer";
import { Notify } from "./Notify";
import { Subscribe } from "../../entity/Subscription/Subscribe";
import { ItineraryStatus } from "../../entity/ItineraryStatus";
import { Logger } from "../../logging/Logger";
import { Customer } from "../../entity/customer/Customer";
import { Contact } from "../../entity/contact/Contact";
import { Travel } from "../../entity/travel/Travel";
import {Contract} from "../../entity/contract/Contract";
import {injectable} from "inversify";
import {MailerCommunicator} from "./MailerCommunicator";

@injectable()
export class AgencyNotifier implements RegisterInsurer, Notify{
    public static contacts: Map<number, Contact> = new Map<number, Contact>();
    logger : Logger = new Logger();
    registerInsurerContact(contract: Contract): void {
        AgencyNotifier.contacts.set(contract.getId,contract.getContact);
        MailerCommunicator.sendMail("noreply@blablamove.fr", contract.getContact.getMail(),"The contract has been created !\n id:" + contract.getId+ ", description du contrat : " + contract.getDescription);
        
    }    
    updateInsurerContact(newContract: Contract): void {
        AgencyNotifier.contacts.set(newContract.getId,newContract.getContact);

        MailerCommunicator.sendMail("noreply@blablamove.fr", newContract.getContact.getMail(),"The contract has been updated !\n id:" + newContract.getId+ ", description du contrat : " + newContract.getDescription);
    }
    notifyContractReportCustomer(customer: Customer, contract: Contract, travel: Travel){
        if(!AgencyNotifier.contacts.has(contract.getId)){
            throw "Contract Contact " + contract.getId + " not found"
        }
        MailerCommunicator.sendMail("noreply@blablamove.fr", AgencyNotifier.contacts.get(contract.getId).getMail(),"The contract "+contract.getId+" on travel "+travel.$departure+ "-> "+ travel.$destination+" with customer : " + customer.$name+ " ( mailto:"+customer.$email+" ) " );

    }
    
    
    notifyContractReport(subscription: Subscribe, status: ItineraryStatus){
        if(!AgencyNotifier.contacts.has(subscription.$contract.getId)){
            throw "Contract Contact " + subscription.$contract.getId + " not found"
        }
        MailerCommunicator.sendMail("noreply@blablamove.fr", AgencyNotifier.contacts.get(subscription.$contract.getId).getMail(),"The contract subscription "+ JSON.stringify(subscription)+"has ended with status : " +status );


    }
    notifyContractRegister(newSubscribtion: Subscribe){
        if(!AgencyNotifier.contacts.has(newSubscribtion.$contract.getId)){
            throw "Contract Contact " + newSubscribtion.$contract.getId + " not found"
        }
        MailerCommunicator.sendMail("noreply@blablamove.fr", AgencyNotifier.contacts.get(newSubscribtion.$contract.getId).getMail(),"The contract "+ JSON.stringify(newSubscribtion.$contract) +"has been taken by customer : " +newSubscribtion.$customer.$name );

    }
    
    
}