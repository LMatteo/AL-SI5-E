import {Type} from "../../entity/Type";
import {Contract} from "../../entity/contract/Contract";
import { Police } from "../../entity/Policy/Police";

export interface HandleContract {

    addContract(type: Type,description: string, mail: string, polices: Array<Police>) : Promise<Contract>
    updateContractDescription(id: number, description: string) : Promise<Contract>

}