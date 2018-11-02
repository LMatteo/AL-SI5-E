package fr.unice.polytech.si5.al.e.webservice.interfaces;

import fr.unice.polytech.si5.al.e.webservice.Objects.AddItemRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelSelectRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/travels")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface TravelService {

    @POST
    Response createTravel(TravelCreationRequest request);

    @PUT
    @Path("{travelId}")
    Response addItemToTravel(@PathParam("travelId") String travelId, AddItemRequest request);

    @GET
    Response listTravels();

    @DELETE
    @Path("{travelId}")
    Response endTravel(@PathParam("travelId") String travelId);


    @HEAD
    @Path("{travelId}")
    Response selectTravel(@PathParam("travelId") String travelId, TravelSelectRequest request);
}
