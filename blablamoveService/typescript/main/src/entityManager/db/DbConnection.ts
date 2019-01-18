import {createConnection} from "typeorm";
import {Contact} from "../../entity/contact/Contact";
import {Contract} from "../../entity/contract/Contract";
import {Item} from "../../entity/item/Item";
import {Validator} from "../../entity/validator/Validator";

export function getConnection(){
    return createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "user",
        password: "user",
        database: "blablamove",
        entities : [
            Contact,
            Contract,
            Item,
            Validator
        ],
        synchronize : true
    })
}