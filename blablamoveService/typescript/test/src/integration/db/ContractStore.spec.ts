import {ContractDbStore} from "../../../../main/src/entityManager/db/ContractDbStore";
import {Contract} from "../../../../main/src/entity/contract/Contract";
import {Type} from "../../../../main/src/entity/Type";
import {Contact} from "../../../../main/src/entity/contact/Contact";
import assert = require('assert');
import sequelize = require("../../../../main/src/entity/Sequelize");


describe('db integration test', function () {
    let store : ContractDbStore = new ContractDbStore();

    beforeEach(() => {
        return sequelize.drop()
            .then(() => {
                return store.init()
            })
    });

    it('should create new Contract', function () {

        let contract = new Contract("test",Type.fragile,new Contact("salut"));

        return store.persist(contract)
            .then(() => {
                return store.get()
            })
            .then((contracts) => {
                assert.strictEqual(1,contracts.length);
                assert.deepStrictEqual(contracts[0],contract);
            })
    });
});