import {GetSubscription} from "./GetSubscription";
import {Subscription} from "./Subscription";
import {Contract} from "../../entity/Contract";
import {Subscribe} from "../../entity/Subscribe";
import {Customer} from "../../entity/Customer";
import { SubscribeStore } from "../../entityManager/SubscribeStore";


export class ContractInstance implements GetSubscription, Subscription{
    private store: SubscribeStore;

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
        let sub : Subscribe = this.store.persist(new Subscribe(customer,contract));
        return sub;
    }

    cancelSubscritpion(subscribe: Subscribe): void {
        throw new Error("Method not implemented.");
    }

}