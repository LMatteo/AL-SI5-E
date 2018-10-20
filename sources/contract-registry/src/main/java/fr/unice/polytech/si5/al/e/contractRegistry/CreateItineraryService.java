package fr.unice.polytech.si5.al.e.contractRegistry;

import javax.jws.WebService;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/test")
public class CreateItineraryService {
    @GET
    public String test(){
        return "test";
    }

}
