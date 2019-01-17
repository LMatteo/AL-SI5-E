import {Type} from "../../entity/Type";
import {Contract} from "../../entity/contract/Contract";

export interface ListContract {
    getContractByType(type: Type) : Array<Contract>;
    getContractById(id: number): Contract;
    getAllContract() : Array<Contract>;
}