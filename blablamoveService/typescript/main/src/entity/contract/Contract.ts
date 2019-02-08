import { Type } from "../Type";
import { Comparable } from "../Comparable";
import { Contact } from "../contact/Contact";
import { Jsonable } from "../Jsonable";
import { Police } from "../Policy/Police";
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";
import { type } from "os";

@Entity()
export class Contract implements Comparable, Jsonable {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private description: string;

    @Column()
    private type: Type;

    @OneToOne(type => Contact, { cascade: true, eager: true })
    @JoinColumn()
    private contact: Contact;

    @OneToMany(type => Police, "owner", { cascade: true, eager: true })
    private polices: Police[];

    get getId(): number {
        return this.id;
    }

    set setId(id: number) {
        this.id = id;
    }

    get getDescription(): string {
        return this.description;
    }

    set getDescription(value: string) {
        this.description = value;
    }

    get getType(): Type {
        return this.type;
    }

    set getType(value: Type) {
        this.type = value;
    }

    get getContact(): Contact {
        return this.contact;
    }

    set getContact(value: Contact) {
        this.contact = value;
    }

    get getPolices(): Police[] {
        return this.polices;
    }

    set getPolices(value: Police[]) {
        this.polices = value;
    }

    constructor(
        description: string,
        type: Type,
        contact: Contact,
        polices: Police[]
    ) {
        this.description = description;
        this.type = type;
        this.contact = contact;
        this.polices = polices;
    }

    equal(object: any): boolean {
        if (!(object instanceof Contract)) return false;
        return object.id === this.id;
    }

    toJson(): any {
        let j: any = {};
        j.id = this.id;
        j.type = this.type;
        j.contact = this.contact.toJson();
        j.description = this.description;
        return j;
    }
}
