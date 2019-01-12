import {ComparableSet} from "../../utils/ComparableSet";
import {ContractDoNotExist} from "../../error/ContractDoNotExist";
import {Contract} from "../../entity/contract/Contract";
import ContractModel = require("../../entity/contract/Contract.entity");
import { Sequelize} from "sequelize";


export class ContractStore{


    async clear() : Promise<void> {
        ContractModel.drop();
        await ContractModel.sync();
    }




    async persist(obj: Contract): Promise<void>{
        await ContractModel.sync();

    }

    merge(obj: Contract) : void{

    }

    get(): any {

    }



}