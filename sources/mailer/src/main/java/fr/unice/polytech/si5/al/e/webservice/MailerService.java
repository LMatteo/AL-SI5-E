package fr.unice.polytech.si5.al.e.webservice;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/mail")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface MailerService {

    @POST()
    void sendMail(Email email);
}
