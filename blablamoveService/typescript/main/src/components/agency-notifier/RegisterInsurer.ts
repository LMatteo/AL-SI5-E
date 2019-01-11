import {Contract} from "../../entity/contract/Contract";

export interface RegisterInsurer {
    
    registerInsurerContact(contract: Contract): void
    updateInsurerContact(newContract: Contract):void

}