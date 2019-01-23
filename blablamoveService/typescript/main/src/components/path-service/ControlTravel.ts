import { Travel } from "../../entity/travel/Travel";
import { Item } from "../../entity/item/Item";
import { Customer } from "../../entity/customer/Customer";

export interface ControlTravels {
    createTravel(
        customerName: string,
        departure: string,
        destination: string
    ): Promise<Travel>;

    addItemToTravel(item: Item, travelId: number): Promise<Travel>;

    findTravel(departure: string, destination: string): Promise<Travel[]>;

    findTravelById(travelId: number): Promise<Travel>;

    chooseTravel(transporterName: string, travelId: number): Promise<Travel>;

    finishTravel(travelId: number): void;

    getCustomerById(id: number): Promise<Customer>;
}
