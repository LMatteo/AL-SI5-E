import {Type} from "../Type";
import {Comparable} from "../Comparable";
import {Contact} from "../contact/Contact";
import {Jsonable} from "../Jsonable";
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Contract implements Comparable, Jsonable{

    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private description: string;

    @Column()
    private type : Type;

    @OneToOne(type => Contact, {cascade : true})
    @JoinColumn()
    private contact: Contact;


    get getId() : number {
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

    constructor(description: string, type: Type, contact: Contact) {
        this.description = description;
        this.type = type;
        this.contact = contact;
    }


    equal(object: any): boolean {
        if(!(object instanceof Contract)) return false;
        return object.id === this.id;
    }

    toJson(): any {
        let j : any = {};
        j.id = this.id;
        j.type = this.type;
        j.contact = this.contact.toJson();
        j.description = this.description;
        return j;
    }



}