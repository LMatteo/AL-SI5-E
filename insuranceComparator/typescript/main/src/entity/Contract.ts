import {Policy} from "./Policy";

export class Contract {
    public type: string;
    public policies: Policy[];
    public id: number;
    public totalprice: number;
    constructor(id: number, type: string, policies: Policy[]) {
        this.id = id;
        this.type = type;
        this.policies = policies;
    }

}