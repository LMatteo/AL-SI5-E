package fr.unice.polytech.si5.al.e.contractRegistry.exceptions;

import fr.unice.polytech.si5.al.e.model.exceptions.HttpException;

public class NoSuchContractIdException extends HttpException {

    public NoSuchContractIdException(int code) {
        super(code, "There is no contract with the given id");
    }


}
