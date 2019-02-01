import {Travel} from "../../entity/travel/Travel";

export interface PathValidate {
    pathValidate(travel: Travel): Promise<Travel>;
    pathInvalidate(travel: Travel): Promise<Travel>;
}
