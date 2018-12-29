import {HttpCodeError} from "./HttpCodeError";

export class ContractDoNotExist extends Error implements HttpCodeError{
    constructor(){
        super('No Such contract')
    }

    getHttpCode(): number {
        return 400;
    }

}