import { Comparable } from "./Comparable";
import { Item } from "./Item";
import { Customer } from "./Customer";

export class Travel implements Comparable {
    private id: string;
    private departure: string;
    private destination: string;
    private state: string;
    // private validator: Validator;
    private items: Item[];
    private customer: Customer;
    private transporter: Customer;

    constructor() {
        this.items = [];
    }

    public get $id(): string {
        return this.id;
    }

    public get $departure(): string {
        return this.departure;
    }

    public get $destination(): string {
        return this.destination;
    }

    public get $state(): string {
        return this.state;
    }

    public get $items(): Item[] {
        return this.items;
    }

    public get $customer(): Customer {
        return this.customer;
    }

    public get $transporter(): Customer {
        return this.transporter;
    }

    public set $id(value: string) {
        this.id = value;
    }

    public set $departure(value: string) {
        this.departure = value;
    }

    public set $destination(value: string) {
        this.destination = value;
    }

    public set $state(value: string) {
        this.state = value;
    }

    public set $items(value: Item[]) {
        this.items = value;
    }

    public set $customer(value: Customer) {
        this.customer = value;
    }

    public set $transporter(value: Customer) {
        this.transporter = value;
    }

    public addItem(item: Item) {
        this.items.push(item);
    }

    equal(object: any): boolean {
        if (!(object instanceof Travel)) return false;
        return this.id === object.id;
    }
}
