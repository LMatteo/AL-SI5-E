import {Contract} from "../../entity/contract/Contract";
import model = require("../../entity/contract/Contract.entity");
import {createUuid} from "../UuidGenerator";
import ContactCon = require("../../entity/contact/Contact.entity");
import {Model, Sequelize} from "sequelize";
import {ContractModel} from "../../entity/contract/Contract.model";
import {ContactModel} from "../../entity/contact/Contact.model";
import {Type} from "../../entity/Type";
import {Contact} from "../../entity/contact/Contact";
import {ContractDoesNotExist} from "../../error/ContractDoesNotExist";

const ContractCon = model.object;
const Association = model.contactAssociation;

export class ContractDbStore{

    async init(){
        await ContactCon.sync();
        await ContractCon.sync();
    }

    async clear() : Promise<void> {
        await ContractCon.drop();
        await ContactCon.sync();
        await ContractCon.sync();
    }




    async persist(obj: Contract): Promise<Contract>{
        await ContractCon.sync();
        obj.id = createUuid();
        let result = await ContractCon.create(obj.toModel(),
            { include : [{
                    association : Association
                }]
        });
        return ContractModel.fromObj(result.get()).toContract();

    }

    async merge(obj: Contract) : Promise<Contract>{
        await ContractCon.sync();

        let modificated : Array<any>  = await ContractCon.update(
            obj.toModel(),
            {returning : true, where : { id : obj.id} }
        );
        if(modificated[1] == 0){
            throw ContractDoesNotExist;
        }

        return obj;
    }

    async get(): Promise<Array<Contract>> {
        await ContractCon.sync();
        let result : Array<any> = await ContractCon.findAll();
        let contracts : Array<Contract> = new Array<Contract>();

        for (let value of result){
            let obj = value.get();
            obj.contact = (await value.getContact()).get();
            let contract : ContractModel = ContractModel.fromObj(obj);
            contracts.push(contract.toContract());
        }

        return contracts;

    }



}