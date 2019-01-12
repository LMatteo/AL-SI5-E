import {Comparable} from "../Comparable";
import {Jsonable} from "../Jsonable";
import {ContactModel} from "./Contact.model";

export class Contact implements Comparable, Jsonable{
    private mail : string;

    constructor(mail: string) {
        this.mail = mail;
    }

    equal(object: any): boolean {
        if(!(object instanceof Contact)) return false;
        return this.mail === object.mail;
    }

    toJson(): any {
        let j : any = {};
        j.mail = this.mail;
        return j;
    }

    toModel() : ContactModel{
        return new ContactModel(this.mail);
    }
}