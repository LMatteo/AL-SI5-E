import {HttpCodeError} from "./HttpCodeError";

export class NoSuchSubscription extends Error implements HttpCodeError{
    constructor(){
        super('No Such subscription')
    }

    getHttpCode(): number {
        return 400;
    }

}