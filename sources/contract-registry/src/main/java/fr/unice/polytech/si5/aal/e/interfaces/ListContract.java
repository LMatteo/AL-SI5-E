package fr.unice.polytech.si5.aal.e.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Types;

import java.util.Collection;

public interface ListContract {
    Collection<Contract> getContractByType(Types type);
}
