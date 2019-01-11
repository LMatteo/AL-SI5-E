import {Contract} from "../../entity/Contract";
import {Subscribe} from "../../entity/Subscribe";
import {Customer} from "../../entity/Customer";


export interface Subscription {
    subscribeToContract(customer: Customer,contract: Contract) : Subscribe
    cancelSubscritpion(subscribe: Subscribe) : void
}