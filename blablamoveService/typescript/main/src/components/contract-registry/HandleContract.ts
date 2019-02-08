import {Type} from "../../entity/Type";
import {Contract} from "../../entity/contract/Contract";
import { Policy } from "../../entity/Policy/Policy";

export interface HandleContract {

    addContract(type: Type,description: string, mail: string, policies: Array<Policy>) : Promise<Contract>
    updateContractDescription(id: number, description: string) : Promise<Contract>

}