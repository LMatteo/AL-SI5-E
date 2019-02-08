import { Type } from "../Type";
import { Comparable } from "../Comparable";
import { Contact } from "../contact/Contact";
import { Jsonable } from "../Jsonable";
import { Policy } from "../Policy/Policy";
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

    @OneToMany(type => Policy, "owner", { cascade: true, eager: true })
    private policies: Policy[];

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

    get getPolicies(): Policy[] {
        return this.policies;
    }

    set getPolicies(value: Policy[]) {
        this.policies = value;
    }

    constructor(
        description: string,
        type: Type,
        contact: Contact,
        policies: Policy[]
    ) {
        this.description = description;
        this.type = type;
        this.contact = contact;
        this.policies = policies;
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
