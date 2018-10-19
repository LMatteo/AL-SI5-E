package fr.unice.polytech.si5.al.e.agencynotifier.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;

public interface RegisterInsurer {

    void registerInsurerContact(Contract contract);
    void updateInsurerContact(Contract newContract);

}
