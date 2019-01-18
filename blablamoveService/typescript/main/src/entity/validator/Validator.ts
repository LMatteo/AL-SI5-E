import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Validator {

    @PrimaryGeneratedColumn()
    private id : number;

    @Column()
    private insuranceValidation: boolean;

    @Column()
    private pathValidation: boolean;

    get $id() : number{
        return this.id;
    }

    set $id(id : number){
        this.id = id;
    }

    public set $insuranceValidation(value: boolean) {
        this.insuranceValidation = value;
    }

    public set $pathValidation(value: boolean) {
        this.pathValidation = value;
    }

    constructor() {
        this.insuranceValidation = false;
        this.pathValidation = false;
    }

    public isValid(): boolean {
        return this.insuranceValidation && this.pathValidation;
    }
}
