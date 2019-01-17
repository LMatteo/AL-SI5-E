import {createConnection} from "typeorm";
import {Contact} from "../../entity/contact/Contact";
import {Contract} from "../../entity/contract/Contract";

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
            Contract
        ],
        synchronize : true
    })
}