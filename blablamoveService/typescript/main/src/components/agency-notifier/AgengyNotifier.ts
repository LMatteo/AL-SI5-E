import { RegisterInsurer } from "./RegisterInsurer";
import { Notify } from "./Notify";
import { Contract } from "../../entity/Contract";
import { Subscribe } from "../../entity/Subscribe";
import { ItineraryStatus } from "../../entity/ItineraryStatus";
import { Logger } from "../../logging/Logger";
import { LoggingLevel } from "../../logging/LoggingLevel";
import Level = require("../../logging/Level");
import { Customer } from "../../entity/Customer";
import { Travel } from "../../entity/Travel";

export class AgencyNotifier implements RegisterInsurer, Notify{
  
    logger : Logger = new Logger();
    registerInsurerContact(contract: Contract): void {
        this.logger.log(Level.info, "registerInsurerContact : " + contract);
        
    }    
    updateInsurerContact(newContract: Contract): void {
        this.logger.log(Level.info, "updateInsurerContact : " + newContract );
    }
    notifyContractReportCustomer(customer: Customer, contract: Contract, travel: Travel){
        this.logger.log(Level.info, "notifyContractReportCustomer : " + customer );
    }
    
    
    notifyContractReport(subscription: Subscribe, status: ItineraryStatus){
        this.logger.log(Level.info, "notifyContractReport : " + subscription + "new dtatus " + status);
        
    }
    notifyContractRegister(newSubscribtion: Subscribe){
        this.logger.log(Level.info, "registerInsurerContact : " + newSubscribtion);
        
    }
    
    
}