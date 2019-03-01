import { Subscribe } from "../../entity/Subscription/Subscribe";
import { Customer } from "../../entity/customer/Customer";
import { Contract } from "../../entity/contract/Contract";
import { Policy } from "../../entity/Policy/Policy";

export interface Subscription {
    subscribeToContract(
        customer: Customer,
        contract: Contract,
        policies: Policy[]
    ): Promise<Subscribe>;
    cancelSubscritpion(subscribe: Subscribe): Promise<void>;
}
