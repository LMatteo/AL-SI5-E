package fr.unice.polytech.si5.al.e.webservice;

import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.webservice.Objects.AddItemRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelSelectRequest;
import fr.unice.polytech.si5.al.e.webservice.interfaces.TravelService;

import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import java.util.Collections;
import java.util.List;

@Path("/travels")
public class TravelWebServiceImpl implements TravelService {
    @Override
    @POST
    public void createTravel(TravelCreationRequest request) {
        System.out.println(request);
    }

    @PUT()
    @Path("{travelId}")
    public void addItemToTravel(@PathParam("travelId") String travelId, AddItemRequest request){
        System.out.println(travelId + "\n" + request);
    }

    @Override
    public List<Travel> listTravels() {
        Travel o = new Travel();
        o.setStart("start");
        o.setEnd("end");
        return Collections.singletonList(o);
    }

    @Override
    public void endTravel(String travelId) {
        System.out.println("Travel " + travelId + "is finished");
    }

    @Override
    public void selectTravel(String travelId, TravelSelectRequest request) {
        System.out.println("Select travel " + travelId + "\n" + request);
    }
}
