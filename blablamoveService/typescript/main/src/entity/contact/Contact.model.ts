import {Contact} from "./Contact";

export class ContactModel{
    public mail:string


    constructor(mail: string) {
        this.mail = mail;
    }

    static fromObj(obj: any) : ContactModel{
        return  new ContactModel(obj.mail);
    }

    toContact() : Contact{
        return new Contact(this.mail);
    }
}