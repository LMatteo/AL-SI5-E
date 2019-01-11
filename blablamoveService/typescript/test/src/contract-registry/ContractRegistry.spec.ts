import 'mocha';
import {ContractStore} from "../../../main/src/entityManager/local/ContractStore";
import {ContractRegistry} from "../../../main/src/components/contract-registry/ContractRegistry";
import {Type} from "../../../main/src/entity/Type";
import * as Assert from "assert";
import {Contract} from "../../../main/src/entity/contract/Contract";
import {Contact} from "../../../main/src/entity/contact/Contact";
import {ContractDoNotExist} from "../../../main/src/error/ContractDoNotExist";
import {strictEqual} from "assert";

describe("contract registry test", function () {

    let registry : ContractRegistry;

    beforeEach(function () {
        new ContractStore().clear();
        registry = new ContractRegistry();
    });

    it('should add contract ', function () {
        registry.addContract(Type.fragile, "test","salut@hotmail.com");

        let store : ContractStore = new ContractStore();

        Assert.strictEqual(1,store.get().length);
        let contract : Contract = store.get()[0];

        Assert.strictEqual(Type.fragile,contract.type);
        Assert.strictEqual(true,contract.contact.equal(new Contact("salut@hotmail.com")));
        Assert.strictEqual("test",contract.description);
    });

    it('should return the contract with the specified id', function () {
        let contract : Contract = registry.addContract(Type.fragile, "test","salut@hotmail.com");
        Assert.strictEqual(true, contract.equal(registry.getContractById(contract.id)));
    });

    it('should throw an error as the contract is unknown', function () {

        Assert.throws(function() {
            registry.getContractById("owowowwowo");
        }, ContractDoNotExist)
    });

    it('should return the right number of contract', function () {
        registry.addContract(Type.fragile, "test","salut@hotmail.com");
        registry.addContract(Type.fragile, "test","salut@hotmail.com");
        registry.addContract(Type.fragile, "test","salut@hotmail.com");
        registry.addContract(Type.fragile, "test","salut@hotmail.com");
        registry.addContract(Type.fragile, "test","salut@hotmail.com");
        registry.addContract(Type.fragile, "test","salut@hotmail.com");
        registry.addContract(Type.fragile, "test","salut@hotmail.com");
        registry.addContract(Type.fragile, "test","salut@hotmail.com");

        Assert.strictEqual(8,registry.getContractByType(Type.fragile).length);
        Assert.strictEqual(0,registry.getContractByType(Type.heavy).length);

    });

    it('should modify a contract', function () {
        let contract : Contract = registry.addContract(Type.fragile, "test","salut@hotmail.com");

        registry.updateContractDescription(contract.id,"new");

        Assert.strictEqual("new", registry.getContractById(contract.id).description);
    });

    it('should throw error', function () {
        Assert.throws(function () {
            registry.updateContractDescription("chec","check")
        }, ContractDoNotExist)
    });

});