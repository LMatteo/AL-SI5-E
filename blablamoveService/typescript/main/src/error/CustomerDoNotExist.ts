import { HttpCodeError } from "./HttpCodeError";

export class CustomerDoNotExist extends Error implements HttpCodeError {
    constructor() {
        super("No Such customer");
    }

    getHttpCode(): number {
        return 400;
    }
}
