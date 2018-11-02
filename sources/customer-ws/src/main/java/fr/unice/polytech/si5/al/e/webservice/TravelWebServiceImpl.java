package fr.unice.polytech.si5.al.e.webservice;

import fr.unice.polytech.si5.al.e.ControlTravel;
import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Item;
import fr.unice.polytech.si5.al.e.model.Travel;
import fr.unice.polytech.si5.al.e.webservice.Objects.AddItemRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.ListTravel;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelCreationRequest;
import fr.unice.polytech.si5.al.e.webservice.Objects.TravelSelectRequest;
import fr.unice.polytech.si5.al.e.webservice.interfaces.TravelService;
import org.apache.openjpa.lib.log.Log;

import javax.ejb.EJB;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("/travels")
public class TravelWebServiceImpl implements TravelService {
    @EJB
    private ControlTravel controlTravel;

    private static final Logger log = Logger.getLogger(Logger.class.getName());

    @Override
    @POST
    public Response createTravel(TravelCreationRequest request) {
        controlTravel.createTravel(request.getCustomerName(), request.getDeparture(), request.getDestination());
        return Response.ok("Travel created.").build();
    }

    @PUT()
    @Path("{travelId}")
    public Response addItemToTravel(@PathParam("travelId") String travelId, AddItemRequest request) {
        Item item = new Item();
        item.setName(request.getItemName());
        controlTravel.addItemToTravel(item, travelId);
        return Response.ok("Item " + request.getItemName() + " added.").build();
    }

    @Override
    public Response listTravels() {
        ListTravel result = new ListTravel();
        result.setTravels(controlTravel.findTravel("*", "*"));
        return Response.ok(result).build();
    }

    @Override
    public Response endTravel(String travelId) {
        controlTravel.finishTravel(travelId);
        return Response.ok("Travel " + travelId + " finished.").build();
    }

    @Override
    public Response selectTravel(String travelId, TravelSelectRequest request) {
        controlTravel.chooseTravel(travelId, request.getTransporterName());
        return Response.ok("Travel " + travelId + "selected.").build();
    }
}
