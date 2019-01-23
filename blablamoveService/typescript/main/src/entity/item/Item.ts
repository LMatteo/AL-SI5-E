import { Comparable } from "../Comparable";
import { Customer } from "../customer/Customer";
import { Travel } from "../travel/Travel";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Item implements Comparable {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private name: string;

    @ManyToOne(type => Customer)
    private owner: Customer;

    @ManyToOne(type => Travel)
    private travel: Travel;

    get $id(): number {
        return this.id;
    }

    set $id(id: number) {
        this.id = id;
    }

    public get $name(): string {
        return this.name;
    }

    public set $name(value: string) {
        this.name = value;
    }

    public get $owner(): Customer {
        return this.owner;
    }

    public set $owner(value: Customer) {
        this.owner = value;
    }

    public get $travel(): Travel {
        return this.travel;
    }

    public set $travel(value: Travel) {
        this.travel = value;
    }

    equal(object: any): boolean {
        if (!(object instanceof Item)) return false;
        return this.name === object.name;
    }
}
