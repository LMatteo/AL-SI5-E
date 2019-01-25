import {Type} from "../../entity/Type";
import {Contract} from "../../entity/contract/Contract";
import { Police } from "../../entity/Police";

export interface HandleContract {
    addContract(type: Type,description: string, mail: string, polices: Array<Police>) : Contract
    updateContractDescription(id: number, description: string) : Contract

}