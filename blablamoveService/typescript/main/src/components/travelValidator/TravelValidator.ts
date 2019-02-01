import {InsuranceValidate} from "./InsuranceValidate";
import {PathValidate} from "./PathValidate";
import {Travel} from "../../entity/travel/Travel";
import {injectable} from "inversify";

import {Validator} from "../../entity/validator/Validator";
import {getRepository} from "typeorm";

@injectable()
export class TravelValidator implements InsuranceValidate, PathValidate {
    async insuranceValidate(travel: Travel): Promise<Travel> {
        console.log("insuranceValidate",travel.$id);

        if (travel.$validator === undefined) {
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = true;
        let travelRepo = getRepository(Travel);
        await travelRepo.save(travel);
        return travel;
    }

    async insuranceInvalidate(travel: Travel): Promise<Travel> {
        console.log("insuranceInvalidate",travel.$id);
        if (travel.$validator === undefined) {
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = false;

        let travelRepo = getRepository(Travel);
        await travelRepo.save(travel);
        return travel;
    }

    async pathValidate(travel: Travel): Promise<Travel> {
        console.log("pathValidate");
        if (travel.$validator === undefined) {
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = true;
        let travelRepo = getRepository(Travel);
        await travelRepo.save(travel);
        return travel;
    }

    async pathInvalidate(travel: Travel): Promise<Travel> {
        console.log("pathInvalidate");
        if (travel.$validator === undefined) {
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = false;
        let travelRepo = getRepository(Travel);
        await travelRepo.save(travel);
        return travel;
    }
}
