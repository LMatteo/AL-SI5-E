import { Customer } from "../customer/Customer";
import { Contract } from "../contract/Contract";
import { Policy } from "../Policy/Policy";
import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable
} from "typeorm";

@Entity()
export class Subscribe {
    @PrimaryGeneratedColumn()
    private id: number;

    @ManyToOne(type => Customer, { cascade: ["insert", "update"], eager: true })
    private customer: Customer;

    @ManyToOne(type => Contract, { cascade: ["insert", "update"], eager: true })
    private contract: Contract;

    @ManyToMany(type => Policy, { cascade: ["insert", "update"], eager: true })
    @JoinTable()
    private policies: Policy[];

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

    constructor(customer: Customer, contract: Contract, policies: Policy[]) {
        this.customer = customer;
        this.contract = contract;
        this.policies = policies;
    }
}
