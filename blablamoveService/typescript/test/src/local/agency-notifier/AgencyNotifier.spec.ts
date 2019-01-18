import "mocha";
import "reflect-metadata";

import { PathService } from "../../../../main/src/components/path-service/PathService";
import { TravelStore } from "../../../../main/src/entityManager/local/TravelStore";
import { CustomerStore } from "../../../../main/src/entityManager/local/CustomerStore";
import * as Assert from "assert";
import { Customer } from "../../../../main/src/entity/customer/Customer";
import { Travel } from "../../../../main/src/entity/travel/Travel";
import { Item } from "../../../../main/src/entity/item/Item";
import { CustomerDoNotExist } from "../../../../main/src/error/CustomerDoNotExist";
import {ControlTravels} from "../../../../main/src/components/path-service/ControlTravel";
import container from "../../../../main/src/components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../../../../main/src/components/InjectionIdentifier";

describe("path service test", function() {
    let pathService: ControlTravels;
    let christophe: Customer;
    let johan: Customer;
    let travelA: Travel;
    let itemA: Item;

    beforeEach(function() {
        new TravelStore().clear();
        new CustomerStore().clear();
        pathService = container.get(COMPONENT_IDENTIFIER.ControlTravels)
        christophe = new Customer();
        christophe.$name = "christophe";
        new CustomerStore().persist(christophe);
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

    it("create travel ", function() {
        let travel1 = pathService.createTravel(
            "christophe",
            "startpoint",
            "endpoint"
        );
        Assert.strictEqual(travel1.$customer, christophe);
        Assert.strictEqual(travel1.$departure, "startpoint");
        Assert.strictEqual(travel1.$destination, "endpoint");
        Assert.ok(christophe.$shipments.includes(travel1));
    });

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
});
