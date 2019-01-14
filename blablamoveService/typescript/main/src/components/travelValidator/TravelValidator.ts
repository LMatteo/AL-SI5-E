import { InsuranceValidate } from "./InsuranceValidate";
import { PathValidate } from "./PathValidate";
import { TravelStore } from "../../entityManager/local/TravelStore";
import { Travel } from "../../entity/travel/Travel";
import {Component} from "../Component";

export class TravelValidator implements InsuranceValidate, PathValidate, Component {
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
