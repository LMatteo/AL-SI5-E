import {Travel} from "../../entity/travel/Travel";

export interface InsuranceValidate {
    insuranceValidate(travel: Travel): Promise<Travel>;
    insuranceInvalidate(travel: Travel): Promise<Travel>;
}
