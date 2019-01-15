import { Validate } from "./Validate";
import { Travel } from "../../entity/travel/Travel";
import { TravelValidator } from "../travelValidator/TravelValidator";
import { Logger } from "../../logging/Logger";
import Level = require("../../logging/Level");
import { InsuranceValidate } from "../travelValidator/InsuranceValidate";
import { Customer } from "../../entity/customer/Customer";
import { GetSubscription } from "../contract-instance/GetSubscription";
import { ContractInstance } from "../contract-instance/ContractInstance";
import { Subscribe } from "../../entity/Subscribe";
import { Notify } from "../agency-notifier/Notify";
import { AgencyNotifier } from "../agency-notifier/AgengyNotifier";
import { ItineraryStatus } from "../../entity/ItineraryStatus";

export class InsuranceValidator implements Validate {
  
    private logger : Logger = new Logger();
    private validator: InsuranceValidate = new TravelValidator();
    private contracts: GetSubscription = new ContractInstance();
    private notifier: Notify = new AgencyNotifier();
    validate(travel: Travel): void {
        
        this.logger.log(Level.info, "new travel validation beginning");
        let custo: Customer = travel.$customer;
        let customerSubscriptions: Subscribe[] = this.contracts.getSubscriptionByCustomer(custo);

        if(customerSubscriptions.length == 0){
            this.logger.log(Level.info, "travel rejected : moved has no contract");
            this.validator.insuranceInvalidate(travel);
            return;
        }

        let transporter :Customer= travel.$transporter;

        let transporterSubscriptions: Subscribe[] = this.contracts.getSubscriptionByCustomer(transporter);
        
        if(transporterSubscriptions.length == 0){
            this.logger.log(Level.info, "travel rejected : transporter has no contract");
            this.validator.insuranceInvalidate(travel);
            return;
        }

        this.validator.insuranceValidate(travel);
        
        customerSubscriptions.forEach(contractSubscription => {
            this.notifier.notifyContractReportCustomer(custo, contractSubscription.$contract, travel  )
        });

        transporterSubscriptions.forEach(contractSubscription => {
            this.notifier.notifyContractReportCustomer(custo, contractSubscription.$contract, travel  )
        });
        this.logger.log(Level.info, "travel accepted");


    }  

    notify(travel: Travel): void {
        let custo: Customer = travel.$customer;
        let customerSubscriptions: Subscribe[] = this.contracts.getSubscriptionByCustomer(custo);
        customerSubscriptions.forEach(subscription => {
            this.notifier.notifyContractReportCustomer(custo,subscription.$contract,travel);
        });
        let transporter: Customer = travel.$transporter;
        let transporterSubscriptions: Subscribe[] = this.contracts.getSubscriptionByCustomer(transporter);

        transporterSubscriptions.forEach(subscription => {
            this.notifier.notifyContractReportCustomer(transporter,subscription.$contract,travel);
        });

    }

}