import {Comparable} from "../Comparable";
import {Jsonable} from "../Jsonable";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Contact implements Comparable, Jsonable{


    @PrimaryGeneratedColumn()
    private id : number;

    @Column()
    private mail : string;

    constructor(mail: string) {
        this.mail = mail;
    }

    getId(): number {
        return this.id;
    }

    equal(object: any): boolean {
        if(!(object instanceof Contact)) return false;
        return this.mail === object.mail;
    }

    toJson(): any {
        let j : any = {};
        j.mail = this.mail;
        return j;
    }

}