import { InsuranceValidate } from "./InsuranceValidate";
import { PathValidate } from "./PathValidate";
import { TravelStore } from "../../entityManager/local/TravelStore";
import { Travel } from "../../entity/travel/Travel";
import {injectable} from "inversify";
import { Validator } from "../../entity/validator/Validator";

@injectable()
export class TravelValidator implements InsuranceValidate, PathValidate {
    private store: TravelStore;
    constructor() {
        this.store = new TravelStore();
    }

    insuranceValidate(travel: Travel): Travel {
        console.log("insuranceValidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = true;
        this.store.merge(travel);
        return travel;
    }
    insuranceInvalidate(travel: Travel): Travel {
        console.log("insuranceInvalidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$insuranceValidation = false;
        this.store.merge(travel);
        return travel;
    }
    pathValidate(travel: Travel): Travel {
        console.log("pathValidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = true;
        this.store.merge(travel);
        return travel;
    }
    pathInvalidate(travel: Travel): Travel {
        console.log("pathInvalidate");
        if(travel.$validator === undefined){
            travel.$validator = new Validator();
        }
        travel.$validator.$pathValidation = false;
        this.store.merge(travel);
        return travel;
    }
}
