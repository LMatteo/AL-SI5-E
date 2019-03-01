import { HttpCodeError } from "./HttpCodeError";

export class PolicyDoesNotExist extends Error implements HttpCodeError {
    constructor() {
        super("No Such policy");
    }

    getHttpCode(): number {
        return 400;
    }
}
