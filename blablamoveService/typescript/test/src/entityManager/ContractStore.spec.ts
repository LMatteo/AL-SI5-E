import 'mocha';
import Assert = require('assert');

import {ContractStore} from "../../../main/src/entityManager/local/ContractStore";
import {Type} from "../../../main/src/entity/Type";
import {ContractDoNotExist} from "../../../main/src/error/ContractDoNotExist";
import {Contact} from "../../../main/src/entity/contact/Contact";
import {Contract} from "../../../main/src/entity/contract/Contract";


describe("contract store test", function () {

    beforeEach(function () {
        let store : ContractStore = new ContractStore();
        store.clear();
    });

    it('should add a contract to the store', function () {
        let store : ContractStore = new ContractStore();
        let contract: Contract = store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));

        Assert.strictEqual(1,store.get().length);

        Assert.strictEqual(contract.id,store.get()[0].id);

    });

    it('should insert multiple contract to the store', function () {
        let store : ContractStore = new ContractStore();

        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));
        store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));

        Assert.strictEqual(11, store.get().length);
    });

    it('should merge into existing contract', function () {
        let store : ContractStore = new ContractStore();
        let contract: Contract = store.persist(new Contract("test",Type.fragile, new Contact("test@htomail.com")));

        contract.description = "new description";

        store.merge(contract);

        Assert.strictEqual(1,store.get().length);
        Assert.strictEqual(contract.description,store.get()[0].description);
    });

    it('should throw an error', function () {
        let store : ContractStore = new ContractStore();

        try{
            store.merge(new Contract("test",Type.fragile, new Contact("test@htomail.com")))
        } catch (e) {
            Assert.strictEqual(true,e instanceof ContractDoNotExist)
        }
    });
});