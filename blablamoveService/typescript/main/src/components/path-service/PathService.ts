import { ControlTravels } from "./ControlTravel";
import { Item } from "../../entity/item/Item";
import { CustomerDoNotExist } from "../../error/CustomerDoNotExist";
import { MessageQueue } from "../message-queue/MessageQueue";
import { Travel } from "../../entity/travel/Travel";
import { Customer } from "../../entity/customer/Customer";
import { TravelDoNotExist } from "../../error/TravelDoNotExist";
import { PathValidate } from "../travelValidator/PathValidate";
import { inject, injectable } from "inversify";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import {getRepository} from "typeorm";

@injectable()
export class PathService implements ControlTravels {
    @inject(COMPONENT_IDENTIFIER.PathValidate)
    private validator: PathValidate;

    @inject(COMPONENT_IDENTIFIER.MessageQueue)
    private messageQueue: MessageQueue;

    constructor() {}

    async createTravel(
        customerName: string,
        departure: string,
        destination: string
    ): Promise<Travel> {
        let customer: Customer;
        let customerRepo = getRepository(Customer);
        customer = await customerRepo.findOne({
            where: { name: customerName },
            relations: ["shipments", "transports", "items"]
        });
        if (customer === undefined) {
            customer = new Customer();
            customer.$name = customerName;
        }
        let travel = new Travel();
        travel.$customer = customer;
        travel.$departure = departure;
        travel.$destination = destination;
        customer.addTravel(travel);
        await this.validator.pathValidate(travel);
        let travelRepo = getRepository(Travel);
        await travelRepo.save(travel);
        let marshalledTravel: string = JSON.stringify(travel, (key, value) => {
            if (key === "customer" || key === "transporter") {
                return { name: value.$name, id: value.$id };
            }
            return value;
        });
        await this.messageQueue.sendMessage("validation", marshalledTravel);
        travel = await travelRepo.findOne(travel.$id, {
            relations: ["items", "customer", "validator", "transporter"]
        });
        return travel;
    }

    async addItemToTravel(item: Item, travelId: number): Promise<Travel> {
        let travel: Travel;
        let travelRepo = getRepository(Travel);
        travel = await travelRepo.findOne(travelId, {
            relations: [
                "items",
                "customer",
                "customer.items",
                "validator",
                "transporter"
            ]
        });
        if (travel === undefined) {
            throw new TravelDoNotExist();
        }
        travel.addItem(item);
        travel.$customer.addItem(item);
        await travelRepo.save(travel);
        let marshalledTravel: string = JSON.stringify(travel, (key, value) => {
            if (key === "customer" || key === "transporter") {
                return { name: value.$name, id: value.$id };
            }
            return value;
        });
        await this.messageQueue.sendMessage("validation", marshalledTravel);
        return travel;
    }

    async findTravel(
        departure: string,
        destination: string
    ): Promise<Travel[]> {
        let travels: Travel[];
        let travelRepo = getRepository(Travel);
        travels = await travelRepo.find({
            where: { departure: departure, destination: destination },
            relations: ["items", "customer", "validator", "transporter"]
        });

        return travels;
    }

    async findTravelById(travelId: number): Promise<Travel> {
        let travel: Travel;
        let travelRepo = getRepository(Travel);
        travel = await travelRepo.findOne(travelId, {
            relations: ["items", "customer", "validator", "transporter"]
        });
        if (travel === undefined) {
            throw new TravelDoNotExist();
        }
        return travel;
    }

    async chooseTravel(
        transporterName: string,
        travelId: number
    ): Promise<Travel> {
        let transporter: Customer;
        let travel: Travel;
        let travelRepo = getRepository(Travel);
        let customerRepo = getRepository(Customer);
        transporter = await customerRepo.findOne({
            where: { name: transporterName },
            relations: ["transports"]
        });
        if (transporter === undefined) {
            transporter = new Customer();
            transporter.$name = transporterName;
        }
        travel = await travelRepo.findOne(travelId, {
            relations: ["transporter", "customer", "items", "validator"]
        });
        if (travel === undefined) {
            throw new TravelDoNotExist();
        }
        travel.$transporter = transporter;
        transporter.chooseTravel(travel);
        await travelRepo.save(travel);
        travel = await travelRepo.findOne(travelId, {
            relations: ["transporter", "customer", "items", "validator"]
        });
        await this.validator.pathValidate(travel);
        let marshalledTravel: string = JSON.stringify(travel, (key, value) => {
            if (key === "customer" || key === "transporter") {
                return { name: value.$name, id: value.$id };
            }
            return value;
        });
        await this.messageQueue.sendMessage("validation", marshalledTravel);

        return travel;
    }

    finishTravel(travelId: number): void {
        // TODO
    }

    async getCustomerById(id: number): Promise<Customer> {
        let customer: Customer;
        let customerRepo = getRepository(Customer);
        customer = await customerRepo.findOne(id, {
            relations: ["transports", "shipments", "items"]
        });
        if (customer === undefined) {
            throw new CustomerDoNotExist();
        }
        return customer;
    }
}
