import { Customer } from "./Customer";
import { ItemModel } from "../item/Item.model";
import { TravelModel } from "../travel/Travel.model";

export class CustomerModel {
    public id: string;
    public name: string;
    public email: string;
    public phone: number;
    public items: ItemModel[];
    public shipments: TravelModel[];
    public transports: TravelModel[];

    static fromObj(obj: Customer): CustomerModel {
        let customerModel = new CustomerModel();
        customerModel.id = obj.$id;
        customerModel.name = obj.$name;
        customerModel.email = obj.$email;
        customerModel.phone = obj.$phone;
        obj.$items.forEach(i => {
            customerModel.items.push(ItemModel.fromObj(i));
        });
        obj.$shipments.forEach(s => {
            customerModel.shipments.push(TravelModel.fromObj(s));
        });
        obj.$transports.forEach(t => {
            customerModel.transports.push(TravelModel.fromObj(t));
        });
        return customerModel;
    }

    toCustomer(): Customer {
        let customer = new Customer();
        customer.$id = this.id;
        customer.$name = this.name;
        customer.$email = this.email;
        customer.$phone = this.phone;
        this.items.forEach(i => {
            customer.$items.push(i.toItem());
        });
        this.shipments.forEach(s => {
            customer.$shipments.push(s.toTravel());
        });
        this.transports.forEach(t => {
            customer.$transports.push(t.toTravel());
        });
        return customer;
    }
}
