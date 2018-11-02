package fr.unice.polytech.si5.al.e.webservice.interfaces;

import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.webservice.Objects.AddItemRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelSelectRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/subscribe")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface TravelService {

    @POST()
    void createTravel(TravelCreationRequest request);

    @PUT()
    @Path("{travelId}")
    void addItemToTravel(@PathParam("travelId") String travelId, AddItemRequest request);

    @GET()
    List<Travel> listTravels();

    @DELETE()
    @Path("{travelId}")
    void endTravel(@PathParam("travelId") String travelId);


    @HEAD
    @Path("{travelId}")
    void selectTravel(@PathParam("travelId") String travelId, TravelSelectRequest request);
}
