package fr.unice.polytech.si5.al.e.travelValidator;

import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.Local;

@Local
public interface PathValidate {

    Travel pathValidate(Travel travel);
    Travel pathInvalidate(Travel travel);
}
