import { ControlTravels } from "./ControlTravel";
import { Item } from "../../entity/item/Item";
import { TravelStore } from "../../entityManager/local/TravelStore";
import { CustomerStore } from "../../entityManager/local/CustomerStore";
import { TravelValidator } from "../travelValidator/TravelValidator";
import { CustomerDoNotExist } from "../../error/CustomerDoNotExist";
import {Travel} from "../../entity/travel/Travel";
import {Customer} from "../../entity/customer/Customer";
export class PathService implements ControlTravels {
    private travelStore: TravelStore;
    private validator: TravelValidator;
    private customerStore: CustomerStore;

    constructor() {
        this.travelStore = new TravelStore();
        this.customerStore = new CustomerStore();
        this.validator = new TravelValidator();
    }

    createTravel(
        customerName: string,
        departure: string,
        destination: string
    ): Travel {
        let customer: Customer;
        let customers = this.customerStore
            .get()
            .filter(c => c.$name === customerName);
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
        this.validator.pathValidate(travel);
        return travel;
    }

    addItemToTravel(item: Item, travelId: string): Travel {
        let travel = this.travelStore.get().filter(t => t.$id === travelId)[0];
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
        this.validator.pathValidate(travel);
        return travel;
    }

    finishTravel(travelId: string): void {
        // TODO
    }

    getCustomerById(id: string): Customer {
        let customers = this.customerStore.get().filter(c => c.$id === id);
        if (customers.length > 0) {
            return customers[0];
        } else {
            throw new CustomerDoNotExist();
        }
    }
}
