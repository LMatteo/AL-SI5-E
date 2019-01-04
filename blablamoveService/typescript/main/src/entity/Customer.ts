export class Customer {
    
    private id : number;
    private name : string;
    private email : string;
    private phone : number;

    constructor(name : string, email: string, phone : number) {
        this.email = email;
        this.name = name;
        this.phone = phone;
    }

    toJson(): any {
        let j : any = {};
        j.id = 1;
        j.email = this.email;
        j.name = this.name;
        j.phone = this.phone;
        return j;
    }

}