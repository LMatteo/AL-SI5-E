import { InsuranceValidate } from "./InsuranceValidate";
import { PathValidate } from "./PathValidate";
import { Travel } from "../../entity/travel/Travel";
import { injectable } from "inversify";
import { Validator } from "../../entity/validator/Validator";
import {getRepository} from "typeorm";

@injectable()
export class TravelValidator implements InsuranceValidate, PathValidate {
    insuranceValidate(travel: Travel): Travel {
        console.log("insuranceValidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = true;
        async () => {
            let travelRepo = getRepository(Travel);
            travelRepo.save(travel);
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
            let travelRepo = getRepository(Travel);
            travelRepo.save(travel);
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
            let travelRepo = getRepository(Travel);
            travelRepo.save(travel);
        };
        return travel;
    }
    pathInvalidate(travel: Travel): Travel {
        console.log("pathInvalidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = false;
        async () => {
            let travelRepo = getRepository(Travel);
            travelRepo.save(travel);
        };
        return travel;
    }
}
