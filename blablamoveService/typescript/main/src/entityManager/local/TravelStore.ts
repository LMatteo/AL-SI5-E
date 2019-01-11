import { createUuid } from "../UuidGenerator";
import { ComparableSet } from "../../utils/ComparableSet";
import { TravelDoNotExist } from "../../error/TravelDoNotExist";
import {Travel} from "../../entity/travel/Travel";

export class TravelStore {
    private static storage: ComparableSet<Travel> = new ComparableSet<Travel>();

    clear(): void {
        TravelStore.storage = new ComparableSet<Travel>();
    }

    persist(obj: Travel): Travel {
        obj.$id = createUuid();
        while (TravelStore.storage.contain(obj)) {
            obj.$id = createUuid();
        }
        TravelStore.storage.push(obj);
        return obj;
    }

    merge(obj: Travel): Travel {
        let index: number = TravelStore.storage.getIndexOf(obj);
        if (index === null) {
            throw new TravelDoNotExist();
        }

        TravelStore.storage[index] = obj;

        return obj;
    }

    get(): Array<Travel> {
        return TravelStore.storage;
    }
}
