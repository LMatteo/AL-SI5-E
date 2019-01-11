import {Travel} from "../../entity/travel/Travel";

export interface PathValidate {
    pathValidate(travel: Travel): Travel;
    pathInvalidate(travel: Travel): Travel;
}
