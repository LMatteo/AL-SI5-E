import { createUuid } from "../UuidGenerator";
import { ComparableSet } from "../../utils/ComparableSet";
import { CustomerDoNotExist } from '../../error/CustomerDoNotExist';
import {Customer} from "../../entity/customer/Customer";

export class CustomerStore {
    private static storage: ComparableSet<Customer> = new ComparableSet<Customer>();

    clear(): void {
        CustomerStore.storage = new ComparableSet<Customer>();
    }

    persist(obj: Customer): Customer {
        obj.$id = createUuid();
        while (CustomerStore.storage.contain(obj)) {
            obj.$id = createUuid();
        }
        CustomerStore.storage.push(obj);
        return obj;
    }

    merge(obj: Customer): Customer {
        let index: number = CustomerStore.storage.getIndexOf(obj);
        if (index === null) {
            throw new CustomerDoNotExist();
        }

        CustomerStore.storage[index] = obj;

        return obj;
    }

    get(): Array<Customer> {
        return CustomerStore.storage;
    }
}
