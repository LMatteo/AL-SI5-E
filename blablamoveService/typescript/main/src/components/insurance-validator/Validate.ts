import { Travel } from "../../entity/Travel";

export interface Validate {
    validate(travel: Travel): void
    notify(travel: Travel): void
}
