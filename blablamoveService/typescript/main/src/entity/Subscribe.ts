import {Contract} from "./Contract";
import {Customer} from "./Customer";
import { createUuid } from "../entityManager/UuidGenerator";

export class Subscribe {
    
    private id : number;
    private customer : Customer;
    private contract : Contract;

    constructor(customer : Customer, contract: Contract) {
        this.customer = customer;
        this.contract = contract;
    }


    toJson(): any {
        let j : any = {};
        j.id = createUuid();
        j.customer = this.customer.toJson();
        j.contract = this.contract.toJson();
        return j;
    }

}