import { createConnection } from "typeorm";
import { Contact } from "../../entity/contact/Contact";
import { Contract } from "../../entity/contract/Contract";
import { Customer } from "../../entity/customer/Customer";
import { Travel } from "../../entity/travel/Travel";
import { Item } from "../../entity/item/Item";
import { Validator } from "../../entity/validator/Validator";

const host = process.env.dbName || 'localhost';

export function getConnection() {
    return createConnection({
        type: "mysql",
        host: host,
        port: 3306,
        username: "user",
        password: "user",
        database: "blablamove",
        entities: [Contact, Contract, Customer, Travel, Item, Validator],
        synchronize: true
    });
}
