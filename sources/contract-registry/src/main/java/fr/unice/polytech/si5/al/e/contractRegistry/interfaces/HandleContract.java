package fr.unice.polytech.si5.al.e.contractRegistry.interfaces;

import fr.unice.polytech.si5.al.e.contractRegistry.exceptions.NoSuchContractIdException;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Type;

import javax.ejb.Local;

@Local
public interface HandleContract {
    Contract addContract(Type type, String description, String mail);
    Contract updateContractDescription(int id,String description) throws NoSuchContractIdException;
    void clear();
}
