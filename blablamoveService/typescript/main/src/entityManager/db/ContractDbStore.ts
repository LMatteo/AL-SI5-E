import {Contract} from "../../entity/contract/Contract";
import model = require("../../entity/contract/Contract.entity");
import {createUuid} from "../UuidGenerator";
import ContactCon = require("../../entity/contact/Contact.entity");
import {Model, Sequelize} from "sequelize";
import {ContractModel} from "../../entity/contract/Contract.model";
import {ContactModel} from "../../entity/contact/Contact.model";

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




    async persist(obj: Contract): Promise<void>{
        await ContractCon.sync();
        obj.id = createUuid();
        let result = await ContractCon.create(obj.toModel(),
            { include : [{
                    association : Association
                }]
        });

    }

    merge(obj: Contract) : void{

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