import {ComparableSet} from "../../utils/ComparableSet";
import {ContractDoNotExist} from "../../error/ContractDoNotExist";
import {Contract} from "../../entity/contract/Contract";
import model = require("../../entity/contract/Contract.entity");
import { Sequelize} from "sequelize";
import {createUuid} from "../UuidGenerator";

const ContractModel = model.object;
const Association = model.contactAssociation;

export class ContractDbStore{


    async clear() : Promise<void> {
        await ContractModel.drop();
        await ContractModel.sync();
    }




    async persist(obj: Contract): Promise<void>{
        await ContractModel.sync();
        obj.id = createUuid();
        let result = await ContractModel.create(obj.toModel()
            ,{ include : [{
                    association : Association
                }]
        });

        console.log(result)


    }

    merge(obj: Contract) : void{

    }

    async get(): Promise<void> {
        await ContractModel.sync();

    }



}