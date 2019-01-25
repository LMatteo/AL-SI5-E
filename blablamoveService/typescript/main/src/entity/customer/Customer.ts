import { Comparable } from "../Comparable";
import { Item } from "../item/Item";
import { Travel } from "../travel/Travel";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Customer implements Comparable {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @Column({ nullable: true })
    private email: string;

    @Column({ nullable: true })
    private phone: number;

    @OneToMany(type => Item, "owner", {
        cascade: ["insert", "update"]
    })
    private items: Item[];

    @OneToMany(type => Travel, "customer", {
        cascade: ["insert", "update"]
    })
    private shipments: Travel[];

    @OneToMany(type => Travel, "transporter", {
        cascade: ["insert", "update"]
    })
    private transports: Travel[];

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
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

    public get $items(): Item[] {
        return this.items;
    }

    public set $items(value: Item[]) {
        this.items = value;
    }

    public get $shipments(): Travel[] {
        return this.shipments;
    }

    public set $shipments(value: Travel[]) {
        this.shipments = value;
    }

    public get $transports(): Travel[] {
        return this.transports;
    }

    public set $transports(value: Travel[]) {
        this.transports = value;
    }

    constructor() {}

    public addTravel(travel: Travel): void {
        if (this.shipments === undefined) {
            this.shipments = [];
        }
        this.shipments.push(travel);
    }

    public chooseTravel(travel: Travel): void {
        if (this.transports === undefined) {
            this.transports = [];
        }
        this.transports.push(travel);
    }

    public addItem(item: Item): void {
        this.items.push(item);
    }

    equal(object: any): boolean {
        if(object === undefined){return false;}
        if(object !== undefined && !(object instanceof Customer)){
            return false;
        }if(! ("id" in object)){
        }
        return this.id === object.id || this.name == object.name;
    }
}
