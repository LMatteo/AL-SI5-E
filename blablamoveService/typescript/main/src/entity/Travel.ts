import { Comparable } from "./Comparable";
import { Item } from "./Item";
import { Customer } from "./Customer";
import { Validator } from "./Validator";

export class Travel implements Comparable {
    private id: string;
    private departure: string;
    private destination: string;
    private validator: Validator;
    private items: Item[];
    private customer: Customer;
    private transporter: Customer;

    constructor() {
        this.validator = new Validator();
        this.items = [];
    }

    public get $id(): string {
        return this.id;
    }
    public set $id(value: string) {
        this.id = value;
    }

    public get $departure(): string {
        return this.departure;
    }

    public set $departure(value: string) {
        this.departure = value;
    }

    public get $destination(): string {
        return this.destination;
    }

    public set $destination(value: string) {
        this.destination = value;
    }

    public get $items(): Item[] {
        return this.items;
    }

    public set $items(value: Item[]) {
        this.items = value;
    }
    public get $customer(): Customer {
        return this.customer;
    }

    public set $customer(value: Customer) {
        this.customer = value;
    }

    public get $transporter(): Customer {
        return this.transporter;
    }

    public set $transporter(value: Customer) {
        this.transporter = value;
    }

    public get $validator(): Validator {
        return this.validator;
    }

    public set $validator(value: Validator) {
        this.validator = value;
    }

    public addItem(item: Item) {
        this.items.push(item);
    }

    equal(object: any): boolean {
        if (!(object instanceof Travel)) return false;
        return this.id === object.id;
    }
}
