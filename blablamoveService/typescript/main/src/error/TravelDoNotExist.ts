import { HttpCodeError } from "./HttpCodeError";

export class TravelDoNotExist extends Error implements HttpCodeError {
    constructor() {
        super("No Such travel");
    }

    getHttpCode(): number {
        return 400;
    }
}
