import { Contract } from "../entity/Contract";

export interface RegisterInsurer {
    
    registerInsurerContact(contract: Contract): void
    updateInsurerContact(newContract: Contract):void

}