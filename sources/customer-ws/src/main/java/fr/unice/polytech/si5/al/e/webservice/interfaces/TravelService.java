package fr.unice.polytech.si5.al.e.webservice.interfaces;

import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.webservice.Objects.AddItemRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationResponse;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelSelectRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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
    Response listTravels(@QueryParam("departure") String departure, @QueryParam("destination") String destination);

    @GET
    @Path("{travelId}")
    Response getTravel(@PathParam("travelId") String travelId);

    @DELETE
    @Path("{travelId}")
    Response endTravel(@PathParam("travelId") String travelId);


    @PUT
    @Path("{travelId}/transporter")
    Response selectTravel(@PathParam("travelId") String travelId, TravelSelectRequest request);
}
