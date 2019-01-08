import "mocha";
import { PathService } from "../../../main/src/path-service/PathService";
import { TravelStore } from "../../../main/src/entityManager/TravelStore";
import { CustomerStore } from "../../../main/src/entityManager/CustomerStore";
import * as Assert from "assert";
import { Customer } from "../../../main/src/entity/Customer";
import { Travel } from "../../../main/src/entity/Travel";
import { Item } from "../../../main/src/entity/Item";
import { CustomerDoNotExist } from "../../../main/src/error/CustomerDoNotExist";

describe("path service test", function() {
    let pathService: PathService;
    let christophe: Customer;
    let johan: Customer;
    let travelA: Travel;
    let itemA: Item;

    beforeEach(function() {
        new TravelStore().clear();
        new CustomerStore().clear();
        pathService = new PathService();
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
            pathService.getCustomerById("missingId");
        }, CustomerDoNotExist);
    });
});
