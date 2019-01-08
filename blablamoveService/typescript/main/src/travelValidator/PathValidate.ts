import { Travel } from "../entity/Travel";

export interface PathValidate {
    pathValidate(travel: Travel): Travel;
    pathInvalidate(travel: Travel): Travel;
}
