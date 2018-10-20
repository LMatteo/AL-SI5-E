package fr.unice.polytech.si5.aal.e.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;

public interface HandleContract {
    Contract addContract(Contract contract);
    Contract update(Contract contract);
}
