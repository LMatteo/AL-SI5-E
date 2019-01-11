import {Travel} from "../../entity/travel/Travel";

export interface InsuranceValidate {
    insuranceValidate(travel: Travel): Travel;
    insuranceInvalidate(travel: Travel): Travel;
}
