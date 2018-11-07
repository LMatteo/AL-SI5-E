package fr.unice.polytech.si5.al.e.webservice;

import com.google.gson.Gson;
import fr.unice.polytech.si5.al.e.ControlTravel;
import fr.unice.polytech.si5.al.e.model.Item;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.webservice.Objects.AddItemRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.ListTravel;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelSelectRequest;
import fr.unice.polytech.si5.al.e.webservice.interfaces.TravelService;
import org.json.JSONObject;

import javax.ejb.EJB;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/travels")
public class TravelWebServiceImpl implements TravelService {
    @EJB
    private ControlTravel controlTravel;

    @Override
    public Response createTravel(TravelCreationRequest request) {
        Travel travel = controlTravel.createTravel(request.getCustomerName(), request.getDeparture(), request.getDestination());
        return Response.ok(travel.getId()).build();
    }

    @Override
    public Response addItemToTravel(String travelId, AddItemRequest request) {
        Item item = new Item();
        item.setName(request.getItemName());
        controlTravel.addItemToTravel(item, travelId);
        return Response.ok().build();
    }

    @Override
    public Response listTravels(String departure, String destinaton) {

        ListTravel result = new ListTravel();
        result.setTravels(controlTravel.findTravel(departure, destinaton));
        return Response.ok(result.toJSON()).build();
    }

    @Override
    public Response getTravel(String travelId) {
        Travel travel = controlTravel.findTravelById(travelId);
        return Response.ok(travel.toJSON()).build();
    }

    @Override
    public Response endTravel(String travelId) {
        controlTravel.finishTravel(travelId);
        return Response.ok().build();
    }

    @Override
    public Response selectTravel(String travelId, TravelSelectRequest request) {
        controlTravel.chooseTravel(request.getTransporterName(), travelId);
        return Response.ok().build();
    }
}
