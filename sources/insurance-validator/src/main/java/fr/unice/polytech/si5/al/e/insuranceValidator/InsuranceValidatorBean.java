package fr.unice.polytech.si5.al.e.insuranceValidator;

import fr.unice.polytech.si5.al.e.agencynotifier.interfaces.Notify;
import fr.unice.polytech.si5.al.e.insuranceValidator.Validate;
import fr.unice.polytech.si5.al.e.interfaces.GetContract;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.travelValidator.InsuranceValidate;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Collection;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateless
public class InsuranceValidatorBean implements Validate {

    private static final Logger log = Logger.getLogger(Logger.class.getName());


    @EJB
    private Notify notifier;

    @EJB
    private InsuranceValidate validator;

    @EJB
    private GetContract contract;

    @Override
    public void validate(Travel travel) {
        try {
            log.log(Level.INFO, "new travel validation beginning");
            Customer moved = travel.getCustomer();

            Collection<Contract> contracts = contract.getContractByCustomer(moved);

            if (contracts.size() == 0) {
                log.log(Level.INFO, "travel rejected : moved has no contract");

                validator.insuranceInvalidate(travel);
                return;
            }

            Customer transporter = travel.getTransporter();

            Collection<Contract> transporterContract = contract.getContractByCustomer(transporter);

            if (transporterContract.size() == 0) {
                log.log(Level.INFO, "travel rejected : transport has no contract");

                validator.insuranceInvalidate(travel);
                return;
            }

            validator.insuranceValidate(travel);

            for (Contract contract : contracts) {
                notifier.notifyContractReport(moved, contract, travel);
            }

            for (Contract contract : transporterContract) {
                notifier.notifyContractReport(transporter, contract, travel);
            }

            log.log(Level.INFO, "travel ACCEPTED");
        } catch (Exception e){
            log.log(Level.WARNING,"VALIDATION FAILED FOR UNKNOWN REASON");
            log.log(Level.WARNING,e.toString());
            validator.insuranceInvalidate(travel);
        }

    }
}
