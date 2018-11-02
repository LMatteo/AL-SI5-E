package fr.unice.polytech.si5.al.e.travelValidator;

import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class ValidatorBean implements InsuranceValidate,PathValidate {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public Travel insuranceValidate(Travel travel) {
        travel.getValidator().setInsuranceValidation(true);
        manager.merge(travel);

        return travel;
    }

    @Override
    public Travel insuranceInvalidate(Travel travel) {
        travel.getValidator().setInsuranceValidation(false);
        manager.merge(travel);

        return travel;
    }

    @Override
    public Travel pathValidate(Travel travel) {
        travel.getValidator().setPathValidation(true);
        manager.merge(travel);

        return travel;
    }

    @Override
    public Travel pathInvalidate(Travel travel) {
        travel.getValidator().setPathValidation(true);
        manager.merge(travel);

        return travel;
    }
}
