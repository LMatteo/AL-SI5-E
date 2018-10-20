package fr.unice.polytech.si5.aal.e.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.ejb.Local;
import java.util.Collection;

@Local
public interface ListContract {
    Collection<Contract> getContractByType(Types type);
}
