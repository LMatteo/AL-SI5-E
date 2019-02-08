import { Travel } from "../../entity/travel/Travel";

export interface Validate {
    validate(travel: Travel):  Promise<void>
    notify(travel: Travel):  Promise<void>
}
