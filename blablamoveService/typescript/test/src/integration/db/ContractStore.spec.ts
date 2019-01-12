import {ContractDbStore} from "../../../../main/src/entityManager/db/ContractDbStore";
import {Contract} from "../../../../main/src/entity/contract/Contract";
import {Type} from "../../../../main/src/entity/Type";
import {Contact} from "../../../../main/src/entity/contact/Contact";
import assert = require('assert');


describe('db integration test', function () {
    it('should create new Contract', function () {
        let store : ContractDbStore = new ContractDbStore();

        let contract = new Contract("test",Type.fragile,new Contact("salut"));

        return store.persist(contract)
    });
});