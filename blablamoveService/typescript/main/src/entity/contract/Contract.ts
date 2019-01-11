import {Type} from "../Type";
import {Comparable} from "../Comparable";
import {Contact} from "../contact/Contact";
import {Jsonable} from "../Jsonable";

export class Contract implements Comparable, Jsonable{
    private _id: string;
    private _description: string;
    private _type : Type;
    private _contact: Contact;


    constructor(description: string, type: Type, contact: Contact) {
        this._description = description;
        this._type = type;
        this._contact = contact;
    }


    get contact(): Contact {
        return this._contact;
    }

    set contact(value: Contact) {
        this._contact = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get type(): Type {
        return this._type;
    }

    set type(value: Type) {
        this._type = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    equal(object: any): boolean {
        if(!(object instanceof Contract)) return false;
        return object.id === this._id;
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