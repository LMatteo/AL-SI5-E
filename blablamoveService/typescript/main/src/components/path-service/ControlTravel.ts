import {Travel} from "../../entity/travel/Travel";
import {Item} from "../../entity/item/Item";
import {Customer} from "../../entity/customer/Customer";


export interface ControlTravels {
    createTravel(
        customerName: string,
        departure: string,
        destination: string
    ): Travel;

    addItemToTravel(item: Item, travelId: string): Travel;

    findTravel(departure: string, destination: string): Travel[];

    findTravelById(travelId: string): Travel;

    chooseTravel(transporterName: string, travelId: string): Travel;

    finishTravel(travelId: string): void;

    getCustomerById(id: string): Customer;
}