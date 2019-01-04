import {Contract} from "../entity/Contract";
import {createUuid} from "./UuidGenerator";
import {ComparableSet} from "../utils/ComparableSet";
import {ContractDoNotExist} from "../error/ContractDoNotExist";
import { Subscribe } from "../entity/Subscribe";

export class SubscribeStore{
    private static storage = new Array();


    persist(obj: Subscribe): Subscribe{
        obj.toJson().id = createUuid();
        SubscribeStore.storage.push(obj);
        return obj;
    }

    get(): Array<Subscribe> {
        return SubscribeStore.storage;
    }

}