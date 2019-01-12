import {DefineModelAttributes} from "sequelize";
import {Contract} from "./Contract";
import {Contact} from "../contact/Contact";
import {Type} from "../Type";
import {ContactModel} from "../contact/Contact.model";

export class ContractModel{
    public id : string;
    public description : string;
    public type : Type;
    public contact : ContactModel;


    constructor(id: string, description: string, type: Type, contact : Contact) {
        this.id = id;
        this.description = description;
        this.type = type;
        this.contact = contact.toModel();
    }

    static fromObj(obj: any) : ContractModel{
        return  new ContractModel(obj.id,obj.description,obj.type,obj.contact);
    }

    toContract() : Contract{
        let contract : Contract =  new Contract(this.description, this.type,this.contact.toContact());
        contract.id = this.id;
        return contract;
    }
}