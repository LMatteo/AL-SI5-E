import {Subscribe} from "../../entity/Subscription/Subscribe";
import {Customer} from "../../entity/customer/Customer";
import {Contract} from "../../entity/contract/Contract";


export interface Subscription {
    subscribeToContract(customer: Customer,contract: Contract) : Promise<Subscribe>
    cancelSubscritpion(subscribe: Subscribe) : Promise<void>
}