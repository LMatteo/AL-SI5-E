import {Type} from "../../entity/Type";
import {Contract} from "../../entity/contract/Contract";

export interface ListContract {
    getContractByType(type: Type) : Promise<Array<Contract>>;
    getContractById(id: number): Promise<Contract>;
    getAllContract() : Promise<Array<Contract>>;
}