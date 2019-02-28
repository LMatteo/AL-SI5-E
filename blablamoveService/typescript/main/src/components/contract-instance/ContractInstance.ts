import { GetSubscription } from "./GetSubscription";
import { Subscription } from "./Subscription";
import { SubscribeStore } from "../../entityManager/local/SubscribeStore";
import { Notify } from "../agency-notifier/Notify";
import { Subscribe } from "../../entity/Subscription/Subscribe";
import { Customer } from "../../entity/customer/Customer";
import { Contract } from "../../entity/contract/Contract";
import { inject, injectable } from "inversify";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import { NoSuchSubscription } from "../../error/NoSuchSubscription";
import { getRepository } from "typeorm";
import { Policy } from "../../entity/Policy/Policy";

@injectable()
export class ContractInstance implements GetSubscription, Subscription {
    @inject(COMPONENT_IDENTIFIER.Notify)
    private notify: Notify;

    constructor() {}

    async getSubscriptions(): Promise<Array<Subscribe>> {
        let repo = getRepository(Subscribe);

        return await repo.find();
    }

    async getSubscriptionByCustomer(
        customer: Customer
    ): Promise<Array<Subscribe>> {
        let repo = getRepository(Subscribe);

        return await repo.find({
            where: { customer: customer }
        });
    }

    async getSubscriptionById(id: number): Promise<Subscribe> {
        let repo = getRepository(Subscribe);

        let res = await repo.findOne({
            where: { id: id }
        });

        if (res == undefined) {
            throw new NoSuchSubscription();
        }

        return res;
    }

    async subscribeToContract(
        customer: Customer,
        contract: Contract,
        policies: Policy[]
    ): Promise<Subscribe> {
        let subscription: Subscribe = new Subscribe(
            customer,
            contract,
            policies
        );
        console.log("aaa");
        let repo = getRepository(Subscribe);
        console.log("bbb");
        await repo.save(subscription);
        console.log("ccc");
        this.notify.notifyContractRegister(subscription);
        console.log("ddd");
        return subscription;
    }

    async cancelSubscritpion(subscribe: Subscribe): Promise<void> {
        let repo = getRepository(Subscribe);
        await repo.remove(subscribe);
    }
}
