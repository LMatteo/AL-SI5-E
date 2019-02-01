import {GetSubscription} from "./GetSubscription";
import {Subscription} from "./Subscription";
import {SubscribeStore} from "../../entityManager/local/SubscribeStore";
import {Notify} from "../agency-notifier/Notify";
import {Subscribe} from "../../entity/Subscription/Subscribe";
import {Customer} from "../../entity/customer/Customer";
import {Contract} from "../../entity/contract/Contract";
import {inject, injectable} from "inversify";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import {NoSuchSubscription} from "../../error/NoSuchSubscription";
import {getRepository} from "typeorm";


@injectable()
export class ContractInstance implements GetSubscription, Subscription{
   

    @inject(COMPONENT_IDENTIFIER.Notify)
    private notify: Notify;

    constructor(){
    }

    async getSubscriptions(): Promise<Array<Subscribe>> {
        let repo = getRepository(Subscribe);

        return await repo.find()
    }
    async getSubscriptionByCustomer(customer: Customer): Promise<Array<Subscribe>> {
        let repo = getRepository(Subscribe);

        return await repo.find({
            where: {customer: customer},
        });

    }
    async getSubscriptionById(id: number): Promise<Subscribe> {
        let repo = getRepository(Subscribe);

        let res =  await repo.findOne({
            where: {id : id},
        });

        if (res == undefined){
            throw new NoSuchSubscription();
        }

        return res
    }

    async subscribeToContract(customer: Customer , contract: Contract): Promise<Subscribe> {
        let subscription :Subscribe = new Subscribe(customer,contract);
        let repo = getRepository(Subscribe);
        await repo.save(subscription);
        this.notify.notifyContractRegister(subscription);
        return subscription;
    }

    async cancelSubscritpion(subscribe: Subscribe): Promise<void> {
        let repo = getRepository(Subscribe);
        await repo.delete(subscribe)

    }

}