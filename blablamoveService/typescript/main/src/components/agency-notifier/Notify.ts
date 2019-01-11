import {Subscribe} from "../../entity/Subscribe";
import { ItineraryStatus } from "../../entity/ItineraryStatus";
import { Customer } from "../../entity/Customer";
import { Contract } from "../../entity/Contract";
import { Travel } from "../../entity/Travel";

export interface Notify {

    notifyContractReport( subscription: Subscribe, status:ItineraryStatus): void
    notifyContractReportCustomer( customer: Customer, contract:Contract, travel: Travel): void
    notifyContractRegister( newSubscribtion: Subscribe):void
}