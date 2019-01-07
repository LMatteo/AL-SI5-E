import { Travel } from '../entity/Travel';
import { Item } from "../entity/Item";
import { Customer } from '../entity/Customer';

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