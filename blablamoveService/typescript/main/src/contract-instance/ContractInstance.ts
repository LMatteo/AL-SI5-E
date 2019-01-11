import {GetSubscription} from "./GetSubscription";
import {Subscription} from "./Subscription";
import {Contract} from "../entity/Contract";
import {Subscribe} from "../entity/Subscribe";
import {Customer} from "../entity/Customer";
import { SubscribeStore } from "../entityManager/SubscribeStore";
import { Notify } from "../agency-notifier/Notify";
import { AgencyNotifier } from "../agency-notifier/AgengyNotifier";


export class ContractInstance implements GetSubscription, Subscription{
    private store: SubscribeStore;
    private notify: Notify = new AgencyNotifier();
    constructor(){
        this.store = new SubscribeStore();
    }

    getSubscriptions(): Array<Subscribe> {
        let res : Array<Subscribe> = new Array<Subscribe>();
        for(let sub of this.store.get()){
                res.push(sub);
        }
        return res;
    }
    
    getSubscriptionById(id: string): Subscribe {
        throw new Error("Method not implemented.");
    }

    subscribeToContract(customer: Customer , contract: Contract): Subscribe {
        let subscription :Subscribe = new Subscribe(customer,contract);
        let sub : Subscribe = this.store.persist(subscription);
        this.notify.notifyContractRegister(subscription);
        return sub;
    }

    cancelSubscritpion(subscribe: Subscribe): void {
        throw new Error("Method not implemented.");
    }

}