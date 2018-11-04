package fr.unice.polytech.si5.al.e.webservice;



import java.util.logging.Level;
import java.util.logging.Logger;

public class MailerServiceImpl implements MailerService {

    private static final Logger log = Logger.getLogger(Logger.class.getName());


    @Override
    public void sendMail(Email email) {
        log.log(Level.ALL, "The sendMail has been sent to "+ email.getTo() + " with message :" + email.getMessage());

    }
}
