import {ComparableSet} from "../../utils/ComparableSet";
import {ContractDoNotExist} from "../../error/ContractDoNotExist";
import {Contract} from "../../entity/contract/Contract";
import ContractModel = require("../../entity/contract/Contract.entity");
import {Sequelize} from "sequelize";



export class ContractStore{


    clear() : any {
        return ContractModel.drop()
            .then(() => {
                    return ContractModel.sync();
                }
            )
    }

    persist(obj: Contract): any{

    }

    merge(obj: Contract) : any{

    }

    get(): any {

    }



}