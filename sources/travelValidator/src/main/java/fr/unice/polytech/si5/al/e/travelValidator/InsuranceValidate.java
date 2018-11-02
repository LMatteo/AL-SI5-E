package fr.unice.polytech.si5.al.e.travelValidator;

import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.Local;

@Local
public interface InsuranceValidate {

    Travel insuranceValidate(Travel travel);
    Travel insuranceInvalidate(Travel travel);
}
