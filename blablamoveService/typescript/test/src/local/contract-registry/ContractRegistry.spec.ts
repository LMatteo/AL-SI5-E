import 'mocha';
import "reflect-metadata";

import {Type} from "../../../../main/src/entity/Type";
import * as Assert from "assert";
import {Contract} from "../../../../main/src/entity/contract/Contract";
import {Contact} from "../../../../main/src/entity/contact/Contact";
import {HandleContract} from "../../../../main/src/components/contract-registry/HandleContract";
import {ListContract} from "../../../../main/src/components/contract-registry/ListContract";
import container from "../../../../main/src/components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../../../../main/src/components/InjectionIdentifier";
import {ContractDoesNotExist} from "../../../../main/src/error/ContractDoesNotExist";
import {createConnection, getConnection} from "typeorm";

describe("contract registry test", function () {

    let handleContract : HandleContract = container.get(COMPONENT_IDENTIFIER.HandleContract);
    let listContract : ListContract = container.get(COMPONENT_IDENTIFIER.ListContract);

    before(async () => {
        try{
            await createConnection()
        } catch (e) {
            await getConnection().synchronize(true);
        }
    });

    beforeEach(async () => {
        await getConnection().synchronize(true);
    });

    it('should add contract ', async function () {
        let contract = await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");


        Assert.strictEqual(1,(await listContract.getAllContract()).length);

        Assert.strictEqual(Type.fragile,contract.getType);
        Assert.strictEqual(true,contract.getContact.equal(new Contact("salut@hotmail.com")));
        Assert.strictEqual("test",contract.getDescription);
    });

    it('should return the contract with the specified id', async function () {
        let contract : Contract = await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");
        Assert.strictEqual(true, contract.equal(await listContract.getContractById(contract.getId)));
    });

    it('should throw an error as the contract is unknown', function () {
        return listContract.getContractById(90)
            .catch((error) => {
                Assert.strictEqual(true,error instanceof ContractDoesNotExist);
            });
    });

    it('should return the right number of contract', async function () {
        await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");
        await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");
        await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");
        await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");
        await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");
        await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");
        await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");
        await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");

        Assert.strictEqual(8,(await listContract.getContractByType(Type.fragile)).length);
        Assert.strictEqual(0,(await listContract.getContractByType(Type.heavy)).length);

    });

    it('should modify a contract', async function () {
        let contract : Contract = await handleContract.addContract(Type.fragile, "test","salut@hotmail.com");

        await handleContract.updateContractDescription(contract.getId,"new");

        Assert.strictEqual("new", (await listContract.getContractById(contract.getId)).getDescription);
    });

    it('should throw error', function () {
        return handleContract.updateContractDescription(10,"check")
            .catch((error) => {
                console.log(error);
                console.log(ContractDoesNotExist);
                Assert.strictEqual(true, error instanceof ContractDoesNotExist);
            });

    });

});