import {Comparable} from "../Comparable";
import {Validator} from "../validator/Validator";
import {Item} from "../item/Item";
import {Customer} from "../customer/Customer";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";

@Entity()
export class Travel implements Comparable {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private departure: string;

    @Column()
    private destination: string;

    @OneToOne(type => Validator, {cascade: true})
    @JoinColumn()
    private validator: Validator;

    @OneToMany(type => Item, "travel", {
        cascade: ["insert", "update"]
    })
    private items: Item[];

    @ManyToOne(type => Customer, "shipments", {
        cascade: ["insert", "update"]
    })
    private customer: Customer;

    @ManyToOne(type => Customer, "transports", {
        cascade: ["insert", "update"]
    })
    private transporter: Customer;

    constructor() {
        this.validator = new Validator();
    }

    public static deserialize(json: string): Travel {
        let object = JSON.parse(json);

        let travel: Travel = new Travel();
        travel.id = object.id;
        travel.departure = object.departure;
        travel.destination = object.destination;
        travel.items = [];
        if (object.items !== undefined) {

            for (let i = 0; i < object.items.length; i++) {
                let item = new Item();
                let objectItem = object.items[i];
                item.$id = objectItem.id;
                item.$name = objectItem.name;
                travel.items.push(item)
            }
        }
        travel.validator = new Validator();
        travel.validator.$id = object.validator.id;
        travel.validator.$insuranceValidation = object.validator.insuranceValidation;
        travel.validator.$pathValidation = object.validator.pathValidation;

        travel.customer = new Customer();
        if(object.customer !== undefined){
            travel.customer.$name = object.customer.name;
            travel.customer.$email = object.customer.email;
            travel.customer.$id = object.customer.id;

        }
        travel.transporter = new Customer();
        if(object.transporter !== undefined){
            travel.transporter.$name = object.transporter.name;
            travel.transporter.$email = object.transporter.email;
            travel.transporter.$id = object.transporter.id;

        }
        return travel;

    }

    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
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
