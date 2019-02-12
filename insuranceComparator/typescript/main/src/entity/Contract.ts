import {Policy} from "./Policy";

export class Contract {
    private type: string;
    private policies: Policy[];


    constructor(type: string, policies: Policy[]) {
        this.type = type;
        this.policies = policies;
    }

}