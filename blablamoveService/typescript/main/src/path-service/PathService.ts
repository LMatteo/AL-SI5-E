import { ControlTravels } from "./ControlTravel";
import { Travel } from "../entity/Travel";
import { Item } from "../entity/Item";
import { Customer } from "../entity/Customer";
import { TravelStore } from "../entityManager/TravelStore";
import { CustomerStore } from "../entityManager/CustomerStore";
import { Logger } from "../logging/Logger";
import Level = require("../logging/Level");

export class PathService implements ControlTravels {
    private travelStore: TravelStore;
    private customerStore: CustomerStore;

    constructor() {
        this.travelStore = new TravelStore();
        this.customerStore = new CustomerStore();
    }

    createTravel(
        customerName: string,
        departure: string,
        destination: string
    ): Travel {
        const logger: Logger = new Logger();

        let customer: Customer;
        let customers = this.customerStore.get().filter(c => {
            c.$name === customerName;
        });
        if (customers.length > 0) {
            customer = customers[0];
        } else {
            customer = new Customer();
            customer.$name = customerName;
            this.customerStore.persist(customer);
        }
        let travel = new Travel();
        travel.$customer = customer;
        travel.$departure = departure;
        travel.$destination = destination;
        customer.addTravel(travel);
        this.customerStore.merge(customer);
        this.travelStore.persist(travel);
        // validator.pathValidate(travel);
        return travel;
    }

    addItemToTravel(item: Item, travelId: string): Travel {
        let travels = this.travelStore.get().filter(t => t.$id === travelId);
        let travel = travels[0];
        travel.addItem(item);
        travel.$customer.addItem(item);
        this.travelStore.merge(travel);
        return travel;
    }

    findTravel(departure: string, destination: string): Travel[] {
        let travels = this.travelStore.get().filter(t => {
            return t.$departure === departure && t.$destination === destination;
        });
        return travels;
    }

    findTravelById(travelId: string): Travel {
        let travels = this.travelStore.get().filter(t => t.$id === travelId);
        return travels[0];
    }

    chooseTravel(transporterName: string, travelId: string): Travel {
        let transporter: Customer;
        let transporters = this.customerStore
            .get()
            .filter(t => t.$name === transporterName);
        if (transporters.length > 0) {
            transporter = transporters[0];
        } else {
            transporter = new Customer();
            transporter.$name = transporterName;
            this.customerStore.persist(transporter);
        }
        let travel = this.travelStore.get().filter(t => t.$id === travelId)[0];
        travel.$transporter = transporter;
        transporter.chooseTravel(travel);
        this.travelStore.merge(travel);
        this.customerStore.merge(transporter);
        // validator.pathValidate(travel);
        return travel;
    }

    finishTravel(travelId: string): void {}

    getCustomerById(id: string): Customer {
        let customer = this.customerStore.get().filter(c => c.$id === id)[0];
        return customer;
    }
}
