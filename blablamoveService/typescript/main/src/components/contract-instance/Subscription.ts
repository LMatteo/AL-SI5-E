import {Subscribe} from "../../entity/Subscribe";
import {Customer} from "../../entity/customer/Customer";
import {Contract} from "../../entity/contract/Contract";


export interface Subscription {
    subscribeToContract(customer: Customer,contract: Contract) : Subscribe
    cancelSubscritpion(subscribe: Subscribe) : void
}