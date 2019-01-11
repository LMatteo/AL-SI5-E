import {HandleContract} from "./HandleContract";
import {ListContract} from "./ListContract";
import {Type} from "../../entity/Type";
import {Contract} from "../../entity/Contract";
import {ContractStore} from "../../entityManager/ContractStore";
import {ContractDoNotExist} from "../../error/ContractDoNotExist";
import {Contact} from "../../entity/Contact";

export class ContractRegistry implements HandleContract, ListContract{
    private store: ContractStore;

    constructor(){
        this.store = new ContractStore();
    }

    addContract(type: Type, description: string, mail: string): Contract {
        let contract : Contract = this.store.persist(new Contract(description,type, new Contact(mail)));
        return contract;
    }

    getContractById(id: string): Contract {
        for(let contract of this.store.get()){
            if(contract.id === id){
                return contract;
            }
        }
        throw new ContractDoNotExist();
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
                return contract;
            }
        }
        throw new ContractDoNotExist();
    }

}