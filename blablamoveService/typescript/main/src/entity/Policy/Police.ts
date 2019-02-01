import {Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Contract } from "../contract/Contract";

@Entity()
export class Police {
    @PrimaryGeneratedColumn()
    private id: number;


    private price : number;
    private name : string;

    constructor(name: string, price: number){
        this.name = name;
        this.price = price;
    }

    @ManyToOne(type => Contract, "polices")
    private owner: Contract;

    /**
     * Getter $price
     * @return {number}
     */
	public get $price(): number {
		return this.price;
	}

    /**
     * Setter $price
     * @param {number} value
     */
	public set $price(value: number) {
		this.price = value;
    }
    
    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    
    toJson(): any {
        let j : any = {};
        j.name = this.name;
        j.price = this.price;
        return j;
    }

}