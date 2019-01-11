import { Travel } from "../../entity/Travel";

export interface InsuranceValidate {
    insuranceValidate(travel: Travel): Travel;
    insuranceInvalidate(travel: Travel): Travel;
}
