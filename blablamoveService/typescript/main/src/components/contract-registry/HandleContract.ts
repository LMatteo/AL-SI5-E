import {Type} from "../../entity/Type";
import {Contract} from "../../entity/Contract";

export interface HandleContract {
    addContract(type: Type,description: string, mail: string) : Contract
    updateContractDescription(id: string, description: string) : Contract

}