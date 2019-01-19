import { Validate } from "./Validate";
import { Travel } from "../../entity/travel/Travel";
import { Logger } from "../../logging/Logger";
import Level = require("../../logging/Level");
import { InsuranceValidate } from "../travelValidator/InsuranceValidate";
import { Customer } from "../../entity/customer/Customer";
import { GetSubscription } from "../contract-instance/GetSubscription";
import { Subscribe } from "../../entity/Subscribe";
import { Notify } from "../agency-notifier/Notify";
import {inject, injectable} from "inversify";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";

@injectable()
export class InsuranceValidator implements Validate {
  
    private logger : Logger;

    @inject(COMPONENT_IDENTIFIER.InsuranceValidate)
    private insuranceValidate: InsuranceValidate;

    @inject(COMPONENT_IDENTIFIER.GetSubscription)
    private contracts: GetSubscription;

    @inject(COMPONENT_IDENTIFIER.Notify)
    private notifier: Notify ;

    constructor(){
        this.logger = new Logger();
    }

    validate(travel: Travel): void {
        
        this.logger.log(Level.info, "new travel validation beginning");
        console.log("insuranceValidator::validate:" , this.insuranceValidate,travel, typeof travel);
        let custo: Customer = travel.$customer;
        let customerSubscriptions: Subscribe[] = this.contracts.getSubscriptionByCustomer(custo);

        if(customerSubscriptions.length == 0){
            this.logger.log(Level.info, "travel rejected : moved has no contract");
            this.insuranceValidate.insuranceInvalidate(travel);
            return;
        }

        let transporter :Customer= travel.$transporter;

        let transporterSubscriptions: Subscribe[] = this.contracts.getSubscriptionByCustomer(transporter);
        
        if(transporterSubscriptions.length == 0){
            this.logger.log(Level.info, "travel rejected : transporter has no contract");
            this.insuranceValidate.insuranceInvalidate(travel);
            return;
        }
        this.logger.log(Level.info, "insurance has been validated");

        this.insuranceValidate.insuranceValidate(travel);
        
        customerSubscriptions.forEach(contractSubscription => {
            this.notifier.notifyContractReportCustomer(custo, contractSubscription.$contract, travel  )
        });

        transporterSubscriptions.forEach(contractSubscription => {
            this.notifier.notifyContractReportCustomer(custo, contractSubscription.$contract, travel  )
        });
        this.logger.log(Level.info, "travel accepted");


    }  

    notify(travel: Travel): void {
        console.log("insuranceValidator::notify:" , this.insuranceValidate,travel, typeof travel);
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