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
import { getConnection } from "../../entityManager/db/DbConnection";

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
        let connection = await getConnection();
        let customerRepo = connection.getRepository(Customer);
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
        this.validator.pathValidate(travel);
        let travelRepo = connection.getRepository(Travel);
        await travelRepo.save(travel);
        this.messageQueue.sendMessage("validation", travel);
        travel = await travelRepo.findOne(travel.$id, {
            relations: ["items", "customer", "validator", "transporter"]
        });
        await connection.close();
        return travel;
    }

    async addItemToTravel(item: Item, travelId: number): Promise<Travel> {
        let travel: Travel;
        let connection = await getConnection();
        let travelRepo = connection.getRepository(Travel);
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
        
        this.messageQueue.sendMessage("validation", travel);
        await connection.close();
        return travel;
    }

    async findTravel(
        departure: string,
        destination: string
    ): Promise<Travel[]> {
        let travels: Travel[];
        let connection = await getConnection();
        let travelRepo = connection.getRepository(Travel);
        travels = await travelRepo.find({
            where: { departure: departure, destination: destination },
            relations: ["items", "customer", "validator", "transporter"]
        });
        await connection.close();

        return travels;
    }

    async findTravelById(travelId: number): Promise<Travel> {
        let travel: Travel;
        let connection = await getConnection();
        let travelRepo = connection.getRepository(Travel);
        travel = await travelRepo.findOne(travelId, {
            relations: ["items", "customer", "validator", "transporter"]
        });
        if (travel === undefined) {
            await connection.close();
            throw new TravelDoNotExist();
        }
        await connection.close();
        return travel;
    }

    async chooseTravel(
        transporterName: string,
        travelId: number
    ): Promise<Travel> {
        let transporter: Customer;
        let travel: Travel;
        let connection = await getConnection();
        let travelRepo = connection.getRepository(Travel);
        let customerRepo = connection.getRepository(Customer);
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
            await connection.close();
            throw new TravelDoNotExist();
        }
        travel.$transporter = transporter;
        transporter.chooseTravel(travel);
        await travelRepo.save(travel);
        travel = await travelRepo.findOne(travelId, {
            relations: ["transporter", "customer", "items", "validator"]
        });
        await connection.close();
        this.validator.pathValidate(travel);
        this.messageQueue.sendMessage("validation", travel);

        return travel;
    }

    finishTravel(travelId: number): void {
        // TODO
    }

    async getCustomerById(id: number): Promise<Customer> {
        let customer: Customer;
        let connection = await getConnection();
        let customerRepo = connection.getRepository(Customer);
        customer = await customerRepo.findOne(id, {
            relations: ["transports", "shipments", "items"]
        });
        if (customer === undefined) {
            await connection.close();
            throw new CustomerDoNotExist();
        }
        await connection.close();
        return customer;
    }
}
