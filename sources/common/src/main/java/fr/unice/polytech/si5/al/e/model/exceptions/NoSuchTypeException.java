package fr.unice.polytech.si5.al.e.model.exceptions;

public class NoSuchTypeException extends HttpException {
    public NoSuchTypeException() {
        super(400,"the specified type doesn't exist");
    }
}
