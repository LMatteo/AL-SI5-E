import { InsuranceValidate } from "./InsuranceValidate";
import { PathValidate } from "./PathValidate";
import { Travel } from "../../entity/travel/Travel";
import { injectable } from "inversify";
import { getConnection } from "../../entityManager/db/DbConnection";
import { Validator } from "../../entity/validator/Validator";
import {Connection} from "typeorm";
import {Item} from "../../entity/item/Item";
import * as assert from "assert";

@injectable()
export class TravelValidator implements InsuranceValidate, PathValidate {
    insuranceValidate(travel: Travel): Travel {
        console.log("insuranceValidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = true;
        async () => {
            let connection = await getConnection();
            let travelRepo = connection.getRepository(Travel);
            travelRepo.save(travel);
            connection.close();
        };
        return travel;
    }
    insuranceInvalidate(travel: Travel): Travel {
        console.log("insuranceInvalidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = false;
        async () => {
            let connection = await getConnection();
            let travelRepo = connection.getRepository(Travel);
            travelRepo.save(travel);
            connection.close();
        };
        return travel;
    }
    pathValidate(travel: Travel): Travel {
        console.log("pathValidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = true;
        async () => {
            let connection = await getConnection();
            let travelRepo = connection.getRepository(Travel);
            travelRepo.save(travel);
            connection.close();
        };
        return travel;
    }
    pathInvalidate(travel: Travel): Travel {
        console.log("pathInvalidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = false;
        (async () => {
            let connection = await getConnection();
            let travelRepo = connection.getRepository(Travel);
            travelRepo.save(travel);
            connection.close();
        })();
        return travel;
    }
}
