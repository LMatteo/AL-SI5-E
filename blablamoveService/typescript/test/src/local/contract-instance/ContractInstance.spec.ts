import 'reflect-metadata'
import {GetSubscription} from "../../../../main/src/components/contract-instance/GetSubscription";
import {inject} from "inversify";
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



describe('contract instance test', function () {

    let getSubs : GetSubscription;
    let subs : Subscription;


    beforeEach(() => {
       new SubscribeStore().clear();
       getSubs = container.get(COMPONENT_IDENTIFIER.GetSubscription);
       subs = container.get(COMPONENT_IDENTIFIER.Subscription);
    });

    it('should had and retrive subscription', function () {
        let custo = new Customer();
        let contract = new Contract("test",Type.fragile,new Contact("test"),[]);
        let subscription = subs.subscribeToContract(custo,contract);

        assert.strictEqual(1,getSubs.getSubscriptionByCustomer(custo).length);
        assert.deepStrictEqual(subscription,getSubs.getSubscriptionByCustomer(custo)[0]);
        assert.deepStrictEqual(subscription,getSubs.getSubscriptionById(subscription.$id))
    });

    it('should throw an error', function () {
        assert.throws(() => getSubs.getSubscriptionById(900000),NoSuchSubscription)
    });
});