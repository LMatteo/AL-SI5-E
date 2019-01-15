import {HttpCodeError} from "./HttpCodeError";

export class ContractDoesNotExist extends Error implements HttpCodeError{
    constructor(){
        super('No Such contract')
    }

    getHttpCode(): number {
        return 400;
    }

}