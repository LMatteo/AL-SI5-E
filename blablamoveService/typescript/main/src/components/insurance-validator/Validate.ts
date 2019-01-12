import { Travel } from "../../entity/travel/Travel";

export interface Validate {
    validate(travel: Travel): void
    notify(travel: Travel): void
}
