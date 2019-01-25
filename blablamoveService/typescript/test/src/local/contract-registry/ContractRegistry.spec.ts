import 'mocha';
import "reflect-metadata";

import {ContractStore} from "../../../../main/src/entityManager/local/ContractStore";
import {Type} from "../../../../main/src/entity/Type";
import * as Assert from "assert";
import {Contract} from "../../../../main/src/entity/contract/Contract";
import {Contact} from "../../../../main/src/entity/contact/Contact";
import {strictEqual} from "assert";
import {ContractRegistry} from "../../../../main/src/components/contract-registry/ContractRegistry";
import {HandleContract} from "../../../../main/src/components/contract-registry/HandleContract";
import {ListContract} from "../../../../main/src/components/contract-registry/ListContract";
import container from "../../../../main/src/components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../../../../main/src/components/InjectionIdentifier";
import {ContractDoesNotExist} from "../../../../main/src/error/ContractDoesNotExist";

describe("contract registry test", function () {

    let handleContract : HandleContract = container.get(COMPONENT_IDENTIFIER.HandleContract);
    let listContract : ListContract = container.get(COMPONENT_IDENTIFIER.ListContract);

    beforeEach(function () {
        new ContractStore().clear();
    });

    it('should add contract ', function () {
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);

        let store : ContractStore = new ContractStore();

        Assert.strictEqual(1,store.get().length);
        let contract : Contract = store.get()[0];

        Assert.strictEqual(Type.fragile,contract.getType);
        Assert.strictEqual(true,contract.getContact.equal(new Contact("salut@hotmail.com")));
        Assert.strictEqual("test",contract.getDescription);
    });

    it('should return the contract with the specified id', function () {
        let contract : Contract = handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);
        Assert.strictEqual(true, contract.equal(listContract.getContractById(contract.getId)));
    });

    it('should throw an error as the contract is unknown', function () {

        Assert.throws(function() {
            listContract.getContractById(90);
        }, ContractDoesNotExist)
    });

    it('should return the right number of contract', function () {
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);
        handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);

        Assert.strictEqual(8,listContract.getContractByType(Type.fragile).length);
        Assert.strictEqual(0,listContract.getContractByType(Type.heavy).length);

    });

    it('should modify a contract', function () {
        let contract : Contract = handleContract.addContract(Type.fragile, "test","salut@hotmail.com",[]);

        handleContract.updateContractDescription(contract.getId,"new");

        Assert.strictEqual("new", listContract.getContractById(contract.getId).getDescription);
    });

    it('should throw error', function () {
        Assert.throws(function () {
            handleContract.updateContractDescription(10,"check")
        }, ContractDoesNotExist)
    });

});