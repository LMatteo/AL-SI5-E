import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Validator {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private insuranceValidation: boolean;

    @Column()
    private pathValidation: boolean;

    public get $id(): number {
        return this.id;
    }
    public set $id(value: number) {
        this.id = value;
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
