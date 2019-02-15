import {InsuranceValidate} from "./InsuranceValidate";
import {PathValidate} from "./PathValidate";
import {Travel} from "../../entity/travel/Travel";
import {injectable} from "inversify";
import Level = require("../../logging/Level");
import {Validator} from "../../entity/validator/Validator";
import {getRepository} from "typeorm";
import {Logger} from "../../logging/Logger";

@injectable()
export class TravelValidator implements InsuranceValidate, PathValidate {

    private logger : Logger = new Logger();

    async insuranceValidate(travel: Travel): Promise<Travel> {
        console.log("insuranceValidate",travel.$id);

        if (travel.$validator === undefined) {
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = true;
        let travelRepo = getRepository(Travel);
        try {
            await travelRepo.save(travel);
        } catch (e) {
            this.logger.log(Level.error,"could not update travel validation")
        }
        return travel;
    }

    async insuranceInvalidate(travel: Travel): Promise<Travel> {
        console.log("insuranceInvalidate",travel.$id);
        if (travel.$validator === undefined) {
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = false;

        let travelRepo = getRepository(Travel);
        try {
            await travelRepo.save(travel);
        } catch (e) {
            this.logger.log(Level.error,"could not update travel validation")
        }
        return travel;
    }

    async pathValidate(travel: Travel): Promise<Travel> {
        console.log("pathValidate");
        if (travel.$validator === undefined) {
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = true;
        let travelRepo = getRepository(Travel);
        try {
            await travelRepo.save(travel);
        } catch (e) {
            this.logger.log(Level.error,"could not update travel validation")
        }
        return travel;
    }

    async pathInvalidate(travel: Travel): Promise<Travel> {
        console.log("pathInvalidate");
        if (travel.$validator === undefined) {
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = false;
        let travelRepo = getRepository(Travel);
        try {
            await travelRepo.save(travel);
        } catch (e) {
            this.logger.log(Level.error,"could not update travel validation")
        }
        return travel;
    }
}
