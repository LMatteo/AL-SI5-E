package fr.unice.polytech.si5.al.e.agencynotifier.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;

import javax.ejb.Local;

@Local
public interface RegisterInsurer {

    void registerInsurerContact(Contract contract);
    void updateInsurerContact(Contract newContract);

}
