import "reflect-metadata";

import { Contact } from "../../../../main/src/entity/contact/Contact";
import { createConnection, getConnection, getRepository } from "typeorm";
import * as assert from "assert";
import { Contract } from "../../../../main/src/entity/contract/Contract";
import { Type } from "../../../../main/src/entity/Type";
import { Item } from "../../../../main/src/entity/item/Item";
import { Validator } from "../../../../main/src/entity/validator/Validator";
import { Travel } from "../../../../main/src/entity/travel/Travel";
import { Customer } from "../../../../main/src/entity/customer/Customer";
import { Subscribe } from "../../../../main/src/entity/Subscription/Subscribe";

describe("dbTest", function() {
    before(async () => {
        try {
            await createConnection();
        } catch (e) {
            await getConnection().synchronize(true);
        }
    });

    beforeEach(async () => {
        await getConnection().synchronize();
    });

    it("should retrieve getContact", async function() {
        let contact: Contact = new Contact("salut");

        let contactRepo = getRepository(Contact);
        await contactRepo.save(contact);
        let entity: Contact = await contactRepo.findOne(contact.getId());
        assert.deepStrictEqual(entity, contact);
    });

    it("should retrive contract", async function() {
        let contract: Contract = new Contract(
            "type",
            Type.fragile,
            new Contact("sal"),
            []
        );

        let contractRepo = getRepository(Contract);
        await contractRepo.save(contract);
        assert.deepStrictEqual(
            await contractRepo.findOne({
                where: { id: contract.getId }
            }),
            contract
        );
    });

    it("should retrive item", async function() {
        let item: Item = new Item();
        item.$name = "test";

        let repo = getRepository(Item);
        await repo.save(item);
        assert.deepStrictEqual(await repo.findOne(item.$id), item);
    });

    it("should save validator", async function() {
        let validator: Validator = new Validator();

        let repo = getRepository(Validator);
        await repo.save(validator);

        assert.deepStrictEqual(validator, await repo.findOne(validator.$id));

        validator.$insuranceValidation = true;
        validator.$pathValidation = true;
        await repo.save(validator);

        assert.deepStrictEqual(await repo.findOne(validator.$id), validator);
    });

    it("should save customer", async function() {
        let customer = new Customer();
        customer.$name = "toto";
        let repo = getRepository(Customer);
        await repo.save(customer);
        assert.deepStrictEqual(await repo.findOne(customer.$id), customer);
    });

    it("should save travel", async function() {
        let travel = new Travel();
        travel.$departure = "nice";
        travel.$destination = "paris";
        travel.$validator.$pathValidation = true;
        let repo = getRepository(Travel);
        await repo.save(travel);
        assert.deepStrictEqual(
            await repo.findOne(travel.$id, { relations: ["validator"] }),
            travel
        );
    });

    it("should save travel and customer", async function() {
        let travel = new Travel();
        travel.$departure = "nice";
        travel.$destination = "paris";
        travel.$validator.$pathValidation = true;
        let customer = new Customer();
        customer.$name = "toto";
        travel.$customer = customer;
        customer.$shipments = [];
        customer.$shipments.push(travel);
        let travelRepo = getRepository(Travel);
        await travelRepo.save(travel);
        let travel2 = await travelRepo.findOne(travel.$id, {
            relations: ["validator", "customer"]
        });
        assert.deepStrictEqual(travel2.$departure, travel.$departure);
        assert.deepStrictEqual(travel2.$destination, travel.$destination);
        assert.deepStrictEqual(travel2.$validator, travel.$validator);
        assert.deepStrictEqual(travel2.$customer.$id, travel.$customer.$id);

        let customerRepo = getRepository(Customer);
        let customer2 = await customerRepo.findOne(customer.$id, {
            relations: ["shipments"]
        });
        assert.deepStrictEqual(customer2.$name, customer.$name);
        assert.deepStrictEqual(customer2.$phone, customer.$phone);
        assert.deepStrictEqual(customer2.$email, customer.$email);
        assert.deepStrictEqual(
            customer2.$shipments[0].$id,
            customer.$shipments[0].$id
        );
    });

    it("should save travel and transporter", async function() {
        let travel = new Travel();
        travel.$departure = "nice";
        travel.$destination = "paris";
        travel.$validator.$pathValidation = true;
        let transporter = new Customer();
        transporter.$name = "toto";
        travel.$transporter = transporter;
        transporter.$shipments = [];
        transporter.$shipments.push(travel);
        let travelRepo = getRepository(Travel);
        await travelRepo.save(travel);
        let travel2 = await travelRepo.findOne(travel.$id, {
            relations: ["validator", "transporter"]
        });
        assert.deepStrictEqual(travel2.$departure, travel.$departure);
        assert.deepStrictEqual(travel2.$destination, travel.$destination);
        assert.deepStrictEqual(travel2.$validator, travel.$validator);
        assert.deepStrictEqual(
            travel2.$transporter.$id,
            travel.$transporter.$id
        );

        let customerRepo = getRepository(Customer);
        let transporter2 = await customerRepo.findOne(transporter.$id, {
            relations: ["shipments"]
        });
        assert.deepStrictEqual(transporter2.$name, transporter.$name);
        assert.deepStrictEqual(transporter2.$phone, transporter.$phone);
        assert.deepStrictEqual(transporter2.$email, transporter.$email);
        assert.deepStrictEqual(
            transporter2.$shipments[0].$id,
            transporter.$shipments[0].$id
        );
    });

    it("should save travel and item", async function() {
        let travel = new Travel();
        travel.$departure = "nice";
        travel.$destination = "paris";
        travel.$validator.$pathValidation = true;
        let item = new Item();
        item.$name = "toto";
        item.$travel = travel;
        travel.$items = [];
        travel.$items.push(item);
        let travelRepo = getRepository(Travel);
        await travelRepo.save(travel);
        let travel2 = await travelRepo.findOne(travel.$id, {
            relations: ["items"]
        });
        assert.deepStrictEqual(travel2.$departure, travel.$departure);
        assert.deepStrictEqual(travel2.$destination, travel.$destination);
        assert.deepStrictEqual(travel2.$items[0].$id, travel.$items[0].$id);
        assert.deepStrictEqual(travel2.$items[0].$name, travel.$items[0].$name);
    });
    it("should save customer and item", async function() {
        let customer = new Customer();
        customer.$name = "toto";
        let item = new Item();
        item.$name = "titi";
        item.$owner = customer;
        customer.$items = [];
        customer.$items.push(item);
        let repo = getRepository(Customer);
        await repo.save(customer);
        let customer2 = await repo.findOne(customer.$id, {
            relations: ["items"]
        });
        assert.deepStrictEqual(customer2.$name, customer.$name);
        assert.deepStrictEqual(customer2.$items[0].$id, customer.$items[0].$id);
        assert.deepStrictEqual(
            customer2.$items[0].$name,
            customer.$items[0].$name
        );
    });

    it("should save subscription", async function() {
        let customer = new Customer();
        customer.$name = "toto";

        let contract: Contract = new Contract(
            "type",
            Type.fragile,
            new Contact("sal"),
            []
        );

        let subscription = new Subscribe(customer, contract, []);

        let repo = getRepository(Subscribe);

        await repo.save(subscription);
        let retrivedSubscription: Subscribe = await repo.findOne({
            where: { id: subscription.$id }
        });

        assert.deepStrictEqual(subscription, retrivedSubscription);
    });
});
