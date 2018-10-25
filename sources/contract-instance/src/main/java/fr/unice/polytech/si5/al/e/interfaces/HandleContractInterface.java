package fr.unice.polytech.si5.al.e.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.ejb.Local;
import java.util.Collection;

@Local
public interface HandleContractInterface {
    Collection<Contract> getContractByType(Types type);
    Collection<Contract> getContract();
    Contract addContract(Types type, String description, String mail);
    void clear();
}
