package fr.unice.polytech.si5.al.e.contractRegistry.interfaces;

import fr.unice.polytech.si5.al.e.contractRegistry.exceptions.NoSuchContractIdException;
import fr.unice.polytech.si5.al.e.model.Contract;
import fr.unice.polytech.si5.al.e.model.type.Type;

import javax.ejb.Local;
import java.util.Collection;

@Local
public interface ListContract {
    Collection<Contract> getContractByType(Type type);
    Contract getContractById(int id) throws NoSuchContractIdException;
}
