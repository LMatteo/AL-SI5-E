import "mocha";
import "reflect-metadata";

import * as Assert from "assert";
import { Customer } from "../../../../main/src/entity/customer/Customer";
import { Travel } from "../../../../main/src/entity/travel/Travel";
import { Item } from "../../../../main/src/entity/item/Item";
import { CustomerDoNotExist } from "../../../../main/src/error/CustomerDoNotExist";
import { ControlTravels } from "../../../../main/src/components/path-service/ControlTravel";
import container from "../../../../main/src/components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../../../../main/src/components/InjectionIdentifier";
import {createConnection, getConnection, getRepository} from "typeorm";

describe("path service test", function() {
    let pathService: ControlTravels = container.get(COMPONENT_IDENTIFIER.ControlTravels);

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

    it("create travel ", async () => {
        let travel1 = await pathService.createTravel(
            "christophe",
            "startpoint",
            "endpoint"
        );
        Assert.strictEqual(travel1.$customer.$name, "christophe");
        Assert.strictEqual(travel1.$departure, "startpoint");
        Assert.strictEqual(travel1.$destination, "endpoint");
        let customerRepo = getRepository(Customer);
        let christophe = await customerRepo.findOne(travel1.$customer.$id, {
            relations: ["shipments"]
        });
        Assert.ok(christophe.$shipments.some(s => s.$id === travel1.$id));
    });

    it("add item to travel", async () => {
        let itemA = new Item();
        itemA.$name = "itemA";
        let travelA = new Travel();
        let christophe = new Customer();
        christophe.$name = "christophe";
        travelA.$customer = christophe;
        travelA.$departure = "startA";
        travelA.$destination = "endA";
        let transporter = new Customer();
        transporter.$name = "salut";
        travelA.$transporter = transporter;
        let travelRepo = getRepository(Travel);
        await travelRepo.save(travelA);
        let travel1 = await pathService.addItemToTravel(itemA, travelA.$id);
        Assert.strictEqual(travel1.$departure, travelA.$departure);
        Assert.strictEqual(travel1.$destination, travelA.$destination);
        Assert.strictEqual(travel1.$customer.$name, christophe.$name);
        Assert.ok(travel1.$items.some(i => i.$name === itemA.$name));
        Assert.ok(travel1.$customer.$items.some(i => i.$name === itemA.$name));
    });

    it("find travel", async () => {
        await pathService.createTravel("christophe", "startA", "endA");
        let travels = await pathService.findTravel("startA", "endA");
        Assert.strictEqual(travels.length, 1);
        await pathService.createTravel("christophe", "startA", "endA");
        travels = await pathService.findTravel("startA", "endA");
        Assert.strictEqual(travels.length, 2);
        await pathService.createTravel("christophe", "startB", "endB");
        travels = await pathService.findTravel("startB", "endB");
        Assert.strictEqual(travels.length, 1);
    });

    it("choose travel", async () => {
        let travelA = await pathService.createTravel(
            "christophe",
            "startA",
            "endA"
        );
        let travel1 = await pathService.chooseTravel("johan", travelA.$id);
        Assert.strictEqual(travel1.$customer.$name, "christophe");
        Assert.strictEqual(travel1.$transporter.$name, "johan");
        Assert.strictEqual(travel1.$departure, "startA");
        Assert.strictEqual(travel1.$destination, "endA");
    });

    it("get customer by id", async () => {
        let christophe = new Customer();
        christophe.$name = "christophe";
        let customerRepo = getRepository(Customer);
        await customerRepo.save(christophe);
        let byId = await pathService.getCustomerById(christophe.$id);
        Assert.strictEqual(byId.$name, christophe.$name);
    });

    it("get customer by missing id", async () => {
        let f = () => {};
        try {
            await pathService.getCustomerById(89898989);
        } catch (error) {
            f = () => {
                throw error;
            };
        } finally {
            Assert.throws(f, CustomerDoNotExist);
        }
    });
});
