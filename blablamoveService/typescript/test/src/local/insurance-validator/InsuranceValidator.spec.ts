import "mocha";
import "reflect-metadata";

import { PathService } from "../../../../main/src/components/path-service/PathService";
import { TravelStore } from "../../../../main/src/entityManager/local/TravelStore";
import { CustomerStore } from "../../../../main/src/entityManager/local/CustomerStore";
import * as Assert from "assert";
import { Customer } from "../../../../main/src/entity/customer/Customer";
import { Travel } from "../../../../main/src/entity/travel/Travel";
import { Item } from "../../../../main/src/entity/item/Item";
import container from "../../../../main/src/components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../../../../main/src/components/InjectionIdentifier";
import { InsuranceValidator } from "../../../../main/src/components/insurance-validator/InsuranceValidator";
import { Notify } from "../../../../main/src/components/agency-notifier/Notify";
import { GetSubscription } from "../../../../main/src/components/contract-instance/GetSubscription";
import { Subscription } from "../../../../main/src/components/contract-instance/Subscription";
import { Contract } from "../../../../main/src/entity/contract/Contract";
import { Type } from "../../../../main/src/entity/Type";
import { Contact } from "../../../../main/src/entity/contact/Contact";
import { TravelDoNotExist } from "../../../../main/src/error/TravelDoNotExist";

describe("insurance validator test", function() {
    let insuranceValidator: InsuranceValidator;
    let contracts: GetSubscription;
    let notifier: Notify;
    let subscription: Subscription;
    let christophe: Customer;
    let johan: Customer;
    let travelA: Travel;
    let itemA: Item;

    beforeEach(function() {
        new TravelStore().clear();
        new CustomerStore().clear();
        insuranceValidator = container.get(COMPONENT_IDENTIFIER.Validate);
        contracts = container.get(COMPONENT_IDENTIFIER.GetSubscription);
        notifier = container.get(COMPONENT_IDENTIFIER.Notify);
        subscription = container.get(COMPONENT_IDENTIFIER.Subscription);
       
        christophe = new Customer();
        christophe.$name = "christophe";
        new CustomerStore().persist(christophe);
        let contract: Contract = new Contract("Contract",Type.hightech, new Contact("unit@test"));
        subscription.subscribeToContract(christophe, contract);

     
        johan = new Customer();
        johan.$name = "johan";
        new CustomerStore().persist(johan);
        travelA = new Travel();
        travelA.$customer = christophe;
        travelA.$departure = "startA";
        travelA.$destination = "endA";
        new TravelStore().persist(travelA);
        itemA = new Item();
        itemA.$name = "itemA";
    });

    it("notify contract", function() {
        let travelA: Travel = new Travel();
        travelA.$customer = christophe;
        travelA.$transporter = johan;
        travelA.$departure = "startA";
        travelA.$destination = "endA";
        
        insuranceValidator.notify(travelA);


    });
    xit("return error if bad travel is passed", function() {
        let travelA: Travel = new Travel();
        travelA.$customer = christophe;
        travelA.$departure = "startA";
        travelA.$destination = "endA";
        travelA.$transporter = johan;

        Assert.throws(() =>  insuranceValidator.validate(travelA), TravelDoNotExist, "Error thrown");


    });
/*
    it("add item to travel", function() {
        let travel1 = pathService.addItemToTravel(itemA, travelA.$id);
        Assert.strictEqual(travel1, travelA);
        Assert.strictEqual(travel1.$customer, christophe);
        Assert.ok(travel1.$items.includes(itemA));
        Assert.ok(travel1.$customer.$items.includes(itemA));
    });

    it("find travel", function() {
        let travels = pathService.findTravel("startA", "endA");
        Assert.strictEqual(travels.length, 1);
        pathService.createTravel("christophe", "startA", "endA");
        travels = pathService.findTravel("startA", "endA");
        Assert.strictEqual(travels.length, 2);
        pathService.createTravel("christophe", "startB", "endB");
        travels = pathService.findTravel("startB", "endB");
        Assert.strictEqual(travels.length, 1);
    });

    it("choose travel", function() {
        let travel1 = pathService.chooseTravel("johan", travelA.$id);
        Assert.strictEqual(travel1.$customer, christophe);
        Assert.strictEqual(travel1.$transporter, johan);
        Assert.strictEqual(travel1.$departure, "startA");
        Assert.strictEqual(travel1.$destination, "endA");
    });

    it("get customer by id", function() {
        let byId = pathService.getCustomerById(christophe.$id);
        Assert.strictEqual(byId, christophe);
    });

    it("get customer by missing id", function() {
        Assert.throws(function() {
            pathService.getCustomerById(89898989);
        }, CustomerDoNotExist);
    });
    */
});
