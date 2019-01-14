import { Validator } from "./Validator";

export class ValidatorModel {
    public insuranceValidation: boolean;
    public pathValidation: boolean;

    static fromObj(obj: Validator): ValidatorModel {
        let model = new ValidatorModel();
        model.insuranceValidation = obj.$insuranceValidation;
        model.pathValidation = obj.$pathValidation;
        return model;
    }

    toValidator(): Validator {
        let validator = new Validator();
        validator.$insuranceValidation = this.insuranceValidation;
        validator.$pathValidation = this.pathValidation;
        return validator;
    }
}
