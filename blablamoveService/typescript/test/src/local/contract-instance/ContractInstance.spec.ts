import 'reflect-metadata'
import {GetSubscription} from "../../../../main/src/components/contract-instance/GetSubscription";
import COMPONENT_IDENTIFIER from "../../../../main/src/components/InjectionIdentifier";
import {Subscription} from "../../../../main/src/components/contract-instance/Subscription";
import {SubscribeStore} from "../../../../main/src/entityManager/local/SubscribeStore";
import {Customer} from "../../../../main/src/entity/customer/Customer";
import {Contract} from "../../../../main/src/entity/contract/Contract";
import {Type} from "../../../../main/src/entity/Type";
import {Contact} from "../../../../main/src/entity/contact/Contact";
import * as assert from "assert";
import container from "../../../../main/src/components/InjectionConfig";
import {NoSuchSubscription} from "../../../../main/src/error/NoSuchSubscription";
import {createConnection, getConnection} from "typeorm";
import {HandleContract} from "../../../../main/src/components/contract-registry/HandleContract";


describe('contract instance test', function () {

    let getSubs : GetSubscription;
    let subs : Subscription;
    let contractHandler : HandleContract;

    before(async () => {
        try{
            await createConnection()
        } catch (e) {
            await getConnection().synchronize(true);
        }
    });

    beforeEach(async () => {
        await getConnection().synchronize(true);
        new SubscribeStore().clear();
        getSubs = container.get(COMPONENT_IDENTIFIER.GetSubscription);
        subs = container.get(COMPONENT_IDENTIFIER.Subscription);
        contractHandler = container.get(COMPONENT_IDENTIFIER.HandleContract);

    });

    it('should add and retrive subscription', async function () {
        let custo = new Customer();
        custo.$name = "jean";
        let contract = await contractHandler.addContract(Type.fragile, "test","test",[]);
        let subscription = await subs.subscribeToContract(custo,contract);

        assert.strictEqual(1,(await getSubs.getSubscriptionByCustomer(custo)).length);
        assert.deepStrictEqual(subscription,(await getSubs.getSubscriptionByCustomer(custo))[0]);
        assert.deepStrictEqual(subscription,(await getSubs.getSubscriptionById(subscription.$id)))
    });

    it('should throw an error', function () {
        return getSubs.getSubscriptionById(7897984545)
            .catch((e) => {
                assert.strictEqual(true ,e instanceof NoSuchSubscription)
            })
    });

    it('should cancel subscription', async function () {
        let custo = new Customer();
        custo.$name = "jean";
        let contract = await contractHandler.addContract(Type.fragile, "test","test",[]);
        let subscription = await subs.subscribeToContract(custo,contract);

        assert.strictEqual(1,(await getSubs.getSubscriptionByCustomer(custo)).length);
        await subs.cancelSubscritpion(subscription);
        assert.strictEqual(0,(await getSubs.getSubscriptionByCustomer(custo)).length);

        await getSubs.getSubscriptionById(subscription.$id)
            .catch((e) => {
                assert.strictEqual(true ,e instanceof NoSuchSubscription)
            })
    });


});