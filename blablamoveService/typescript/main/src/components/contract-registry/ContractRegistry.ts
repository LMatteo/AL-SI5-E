import {HandleContract} from "./HandleContract";
import {ListContract} from "./ListContract";
import {Type} from "../../entity/Type";
import {ContractStore} from "../../entityManager/local/ContractStore";
import {RegisterInsurer} from "../agency-notifier/RegisterInsurer";
import {Contract} from "../../entity/contract/Contract";
import {Contact} from "../../entity/contact/Contact";
import {AgencyNotifier} from "../agency-notifier/AgengyNotifier";
import {inject, injectable} from "inversify";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import {ContractDoesNotExist} from "../../error/ContractDoesNotExist";

@injectable()
export class ContractRegistry implements HandleContract, ListContract{
    private store: ContractStore;

    @inject(COMPONENT_IDENTIFIER.RegisterInsurer)
    private registerInsurer: RegisterInsurer;

    constructor(){
        this.store = new ContractStore();
    }

    addContract(type: Type, description: string, mail: string): Contract {
        let contract : Contract = this.store.persist(new Contract(description,type, new Contact(mail)));
        this.registerInsurer.registerInsurerContact(contract);
        return contract;
    }

    getContractById(id: string): Contract {
        for(let contract of this.store.get()){
            if(contract.id === id){
                return contract;
            }
        }
        throw new ContractDoesNotExist();
    }

    getContractByType(type: Type): Array<Contract> {
        let res : Array<Contract> = new Array<Contract>();

        for(let contract of this.store.get()){
            if(contract.type === type){
                res.push(contract);
            }
        }

        return res;
    }

    updateContractDescription(id: string, description: string): Contract {
        for(let contract of this.store.get()){
            if(contract.id === id){
                contract.description = description;
                this.store.merge(contract);
                this.registerInsurer.updateInsurerContact(contract);
                return contract;
            }
        }
        
        throw new ContractDoesNotExist();
    }

    getAllContract(): Array<Contract> {
        let res : Array<Contract> = new Array<Contract>();
        for(let contract of this.store.get()){
            res.push(contract);
        }
        return res;
    }

}