import { InsuranceValidate } from "./InsuranceValidate";
import { PathValidate } from "./PathValidate";
import { TravelStore } from "../entityManager/TravelStore";
import { Travel } from "../entity/Travel";

export class TravelValidator implements InsuranceValidate, PathValidate {
    private store: TravelStore;

    constructor() {
        this.store = new TravelStore();
    }

    insuranceValidate(travel: Travel): Travel {
        travel.$validator.$insuranceValidation = true;
        this.store.merge(travel);
        return travel;
    }
    insuranceInvalidate(travel: Travel): Travel {
        travel.$validator.$insuranceValidation = false;
        this.store.merge(travel);
        return travel;
    }
    pathValidate(travel: Travel): Travel {
        travel.$validator.$pathValidation = true;
        this.store.merge(travel);
        return travel;
    }
    pathInvalidate(travel: Travel): Travel {
        travel.$validator.$pathValidation = false;
        this.store.merge(travel);
        return travel;
    }
}
