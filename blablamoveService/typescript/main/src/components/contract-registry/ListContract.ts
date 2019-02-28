import { Type } from "../../entity/Type";
import { Contract } from "../../entity/contract/Contract";
import { Policy } from "../../entity/Policy/Policy";

export interface ListContract {
    getContractByType(type: Type): Promise<Array<Contract>>;
    getContractById(id: number): Promise<Contract>;
    getPolicyById(id: number): Promise<Policy>;
    getAllContract(): Promise<Array<Contract>>;
}
