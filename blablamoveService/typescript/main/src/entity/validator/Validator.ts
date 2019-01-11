export class Validator {
    private insuranceValidation: boolean;
    private pathValidation: boolean;

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
