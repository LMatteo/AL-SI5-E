import { CustomerModel } from "../customer/Customer.model";
import { ValidatorModel } from "../validator/Validator.model";
import { ItemModel } from "../item/Item.model";
import { Travel } from "./Travel";

export class TravelModel {
    public id: string;
    public departure: string;
    public destination: string;
    public validator: ValidatorModel;
    public items: ItemModel[];
    public customer: CustomerModel;
    public transporter: CustomerModel;

    static fromObj(obj: Travel): TravelModel {
        let travelModel = new TravelModel();
        travelModel.id = obj.$id;
        travelModel.departure = obj.$departure;
        travelModel.destination = obj.$destination;
        travelModel.validator = ValidatorModel.fromObj(obj.$validator);
        travelModel.customer = CustomerModel.fromObj(obj.$customer);
        travelModel.transporter = CustomerModel.fromObj(obj.$transporter);
        obj.$items.forEach(i => {
            travelModel.items.push(ItemModel.fromObj(i));
        });
        return travelModel;
    }

    toTravel(): Travel {
        let travel = new Travel();
        travel.$customer = this.customer.toCustomer();
        travel.$transporter = this.transporter.toCustomer();
        travel.$validator = this.validator.toValidator();
        travel.$departure = this.departure;
        travel.$destination = this.destination;
        this.items.forEach(i => {
            travel.$items.push(i.toItem());
        });
        travel.$id = this.id;
        return travel;
    }
}
