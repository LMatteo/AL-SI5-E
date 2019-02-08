import {Subscribe} from "../../entity/Subscription/Subscribe";
import { ItineraryStatus } from "../../entity/ItineraryStatus";
import { Customer } from "../../entity/customer/Customer";
import { Contract } from "../../entity/contract/Contract";
import { Travel } from "../../entity/travel/Travel";

export interface Notify {

    notifyContractReport( subscription: Subscribe, status:ItineraryStatus): void
    notifyContractReportCustomer( customer: Customer, contract:Contract, travel: Travel): void
    notifyContractRegister( newSubscribtion: Subscribe):void
}