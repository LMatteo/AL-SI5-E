package fr.unice.polytech.si5.al.e.model.exceptions;

public class HttpException extends Exception {
    private int httpReturnCode;

    public HttpException(int code, String message){
        super(message);
        this.httpReturnCode = code;
    }

    public int getHttpReturnCode() {
        return httpReturnCode;
    }
}
