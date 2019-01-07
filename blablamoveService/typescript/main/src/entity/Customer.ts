import { Comparable } from "./Comparable";
import { Item } from "./Item";
import { Travel } from "./Travel";

export class Customer implements Comparable {
    private id: string;
    private name: string;
    private email: string;
    private phone: number;
    private items: Item[];
    private shipments: Travel[];
    private transports: Travel[];

    public get $id(): string {
        return this.id;
    }

    public set $id(value: string) {
        this.id = value;
    }

    public get $name(): string {
        return this.name;
    }

    public set $name(value: string) {
        this.name = value;
    }

    public get $email(): string {
        return this.email;
    }

    public set $email(value: string) {
        this.email = value;
    }

    public get $phone(): number {
        return this.phone;
    }

    public set $phone(value: number) {
        this.phone = value;
    }

    constructor() {
        this.items = [];
        this.shipments = [];
        this.transports = [];
    }

    public addTravel(travel: Travel): void {
        this.shipments.push(travel);
    }

    public chooseTravel(travel: Travel): void {
        this.transports.push(travel);
    }

    public addItem(item: Item): void {
        this.items.push(item);
    }

    equal(object: any): boolean {
        if (!(object instanceof Customer)) return false;
        return this.id === object.id;
    }
}
