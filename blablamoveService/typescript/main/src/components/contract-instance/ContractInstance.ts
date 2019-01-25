import {GetSubscription} from "./GetSubscription";
import {Subscription} from "./Subscription";
import {SubscribeStore} from "../../entityManager/local/SubscribeStore";
import {Notify} from "../agency-notifier/Notify";
import {Subscribe} from "../../entity/Subscribe";
import {Customer} from "../../entity/customer/Customer";
import {Contract} from "../../entity/contract/Contract";
import {inject, injectable} from "inversify";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import {NoSuchSubscription} from "../../error/NoSuchSubscription";


@injectable()
export class ContractInstance implements GetSubscription, Subscription{
   
    private store: SubscribeStore;

    @inject(COMPONENT_IDENTIFIER.Notify)
    private notify: Notify;

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
    getSubscriptionByCustomer(customer: Customer): Subscribe[] {
        let res : Array<Subscribe> = new Array<Subscribe>();
        for(let sub of this.store.get()){
            if(sub.$customer.$name == customer.$name){
                res.push(sub);
            }
        }
        return res;
    }
    getSubscriptionById(id: number): Subscribe {
        for(let sub of this.store.get()){
            if(sub.$id ===id){
                return sub
            }
        }
        throw new NoSuchSubscription();
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