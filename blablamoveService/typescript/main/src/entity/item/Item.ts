import { Comparable } from "../Comparable";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Item implements Comparable {

    @PrimaryGeneratedColumn()
    private id : number;

    @Column()
    private name: string;

    get $id() : number{
        return this.id;
    }

    set $id(id : number){
        this.id = id;
    }

    public get $name(): string {
        return this.name;
    }

    public set $name(value: string) {
        this.name = value;
    }

    equal(object: any): boolean {
        if (!(object instanceof Item)) return false;
        return this.name === object.name;
    }
}
