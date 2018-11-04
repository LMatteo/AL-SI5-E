package fr.unice.polytech.si5.al.e.insuranceValidator;

import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.Local;

@Local
public interface Validate {

    void validate(Travel travel);
}
