import {Travel} from "../../entity/travel/Travel";
import {Item} from "../../entity/item/Item";
import {Customer} from "../../entity/customer/Customer";


export interface ControlTravels {
    createTravel(
        customerName: string,
        departure: string,
        destination: string
    ): Travel;

    addItemToTravel(item: Item, travelId: number): Travel;

    findTravel(departure: string, destination: string): Travel[];

    findTravelById(travelId: number): Travel;

    chooseTravel(transporterName: string, travelId: number): Travel;

    finishTravel(travelId: number): void;

    getCustomerById(id: number): Customer;
}