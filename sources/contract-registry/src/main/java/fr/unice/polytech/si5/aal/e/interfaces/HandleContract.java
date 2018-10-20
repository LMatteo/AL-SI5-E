package fr.unice.polytech.si5.aal.e.interfaces;

import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.ejb.Local;

@Local
public interface HandleContract {
    Contract addContract(Types type,String description, String mail);
    Contract updateContractDescription(int id,String description);
}
