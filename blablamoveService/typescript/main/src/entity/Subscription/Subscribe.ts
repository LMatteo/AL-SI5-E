import { createUuid } from "../../entityManager/UuidGenerator";
import {Customer} from "../customer/Customer";
import {Contract} from "../contract/Contract";
import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Subscribe {

    @PrimaryGeneratedColumn()
    private id: number;

    @OneToOne(type => Customer, {cascade : true, eager : true})
    @JoinColumn()
    private customer: Customer;

    @OneToOne(type => Contract, {cascade : true, eager : true})
    @JoinColumn()
    private contract: Contract;

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
        this.id = value;
    }

    public get $customer(): Customer {
        return this.customer;
    }

    public set $customer(value: Customer) {
        this.customer = value;
    }

    public get $contract(): Contract {
        return this.contract;
    }

    public set $contract(value: Contract) {
        this.contract = value;
    }

    constructor(customer: Customer, contract: Contract) {
        this.customer = customer;
        this.contract = contract;
    }
}
