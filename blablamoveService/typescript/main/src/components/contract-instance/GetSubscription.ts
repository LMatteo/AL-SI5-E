import {Subscribe} from "../../entity/Subscription/Subscribe";
import { Customer } from "../../entity/customer/Customer";

export interface GetSubscription {
    getSubscriptions() : Promise<Array<Subscribe>>;
    getSubscriptionById(id: number): Promise<Subscribe>;
    getSubscriptionByCustomer(customer: Customer): Promise<Array<Subscribe>>;
}