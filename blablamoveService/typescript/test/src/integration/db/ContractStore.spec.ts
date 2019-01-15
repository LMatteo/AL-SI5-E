import {ContractDbStore} from "../../../../main/src/entityManager/db/ContractDbStore";
import {Contract} from "../../../../main/src/entity/contract/Contract";
import {Type} from "../../../../main/src/entity/Type";
import {Contact} from "../../../../main/src/entity/contact/Contact";
import assert = require('assert');
import sequelize = require("../../../../main/src/entity/Sequelize");
import {ContractDoesNotExist} from "../../../../main/src/error/ContractDoesNotExist";


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
            .then((savedContract : Contract) => {
                assert.deepStrictEqual(contract,savedContract);
            })
            .then(() => {
                return store.get()
            })
            .then((contracts) => {
                assert.strictEqual(1,contracts.length);
                assert.deepStrictEqual(contracts[0],contract);
            })
    });

    it('should merge existing contract in db', function () {
        let contract = new Contract("test",Type.fragile,new Contact("salut"));

        return store.persist(contract)
            .then((savedContract) => {
                savedContract.type = Type.heavy;
                return store.merge(savedContract);
            })
            .then((mergedContract : Contract) => {
                assert.strictEqual(mergedContract.type, Type.heavy);
                return store.get();
            })
            .then((contracts) => {
                assert.strictEqual(1,contracts.length);
                contract.type = Type.heavy;
                assert.deepStrictEqual(contract,contracts[0])
            })
    });

    it('should throw an error', function () {
        let contract = new Contract("test",Type.fragile,new Contact("salut"));

        return store.persist(contract)
            .then((saved) => {
                saved.id = '2';
                return store.merge(saved);
            })
            .catch((error) => {
                assert.strictEqual(error,ContractDoesNotExist)
            })
    });
});