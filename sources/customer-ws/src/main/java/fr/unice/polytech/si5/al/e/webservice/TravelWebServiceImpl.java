package fr.unice.polytech.si5.al.e.webservice;

import com.google.gson.Gson;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.webservice.Objects.AddItemRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationResponse;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelSelectRequest;
import fr.unice.polytech.si5.al.e.webservice.interfaces.TravelService;

import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;

@Path("/travels")
public class TravelWebServiceImpl implements TravelService {
    @Override
    @POST
    public Response createTravel(TravelCreationRequest request) {
        //todo: remove mock
        String msg = new TravelCreationResponse(12).toJSON();
        System.out.println(msg);
        return Response.ok(msg).build();
    }

    @PUT()
    @Path("{travelId}")
    public Response addItemToTravel(@PathParam("travelId") String travelId, AddItemRequest request){
        //todo: remove mock
        System.out.println(travelId + "\n" + request);
        return Response.ok("Response ok").build();
    }

    @Override
    public Response listTravels(String departure, String destinaton) {
        //todo: remove mock
        Travel o = new Travel();
        o.setId(1);
        o.setStart("start");

        o.setEnd("end");

        List<Travel> entity = Collections.singletonList(o);
        return Response.ok(new Gson().toJson(entity)).build();
    }

    @Override
    public Response endTravel(String travelId) {
        System.out.println("Travel " + travelId + "is finished");
        return Response.ok("Response ok").build();

    }

    @Override
    public Response selectTravel(String travelId, TravelSelectRequest request) {
        //todo: remove mock
        System.out.println("Select travel " + travelId + "\n" + request);
        return Response.ok().build();

    }
}
