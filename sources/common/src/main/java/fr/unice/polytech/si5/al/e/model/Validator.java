package fr.unice.polytech.si5.al.e.model;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Validator {

    @NotNull
    private boolean insuranceValidation;

    @NotNull
    private boolean pathValidation;


    public Validator(){
        this.insuranceValidation = false;
        this.pathValidation = false;
    }

    public boolean isValid(){
        return insuranceValidation && pathValidation;
    }

    public void setInsuranceValidation(boolean insuranceValidation) {
        this.insuranceValidation = insuranceValidation;
    }

    public void setPathValidation(boolean pathValidation) {
        this.pathValidation = pathValidation;
    }
}
