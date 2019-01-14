import {HandleContract} from "../components/contract-registry/HandleContract";
import {ContractRegistry} from "../components/contract-registry/ContractRegistry";

export class ContractHandlerFactory{
    static getComponent() : HandleContract{
        return new ContractRegistry();
    }
}