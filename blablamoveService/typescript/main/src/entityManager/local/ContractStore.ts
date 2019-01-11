import {createUuid} from "../UuidGenerator";
import {ComparableSet} from "../../utils/ComparableSet";
import {ContractDoNotExist} from "../../error/ContractDoNotExist";
import {Contract} from "../../entity/contract/Contract";

export class ContractStore{
    private static storage: ComparableSet<Contract> = new ComparableSet<Contract>();

    clear() : void {
        ContractStore.storage = new ComparableSet<Contract>();
    }

    persist(obj: Contract): Contract{
        obj.id = createUuid();
        while(ContractStore.storage.contain(obj)){
            obj.id = createUuid();
        }
        ContractStore.storage.push(obj);
        return obj;
    }

    merge(obj: Contract) : Contract{
        let index:number = ContractStore.storage.getIndexOf(obj);
        if(index === null){
            throw new ContractDoNotExist();
        }

        ContractStore.storage[index] = obj;

        return obj;
    }

    get(): Array<Contract> {
        return ContractStore.storage;
    }



}