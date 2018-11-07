package fr.unice.polytech.si5.al.e;

import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Item;
import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.Local;
import java.util.List;

@Local
public interface ControlTravel {
    Travel createTravel(String customerName, String departure, String destination);

    Travel addItemToTravel(Item item, String travelId);

    List<Travel> findTravel(String departure, String destination);

    List<Travel> findTravel();

    Travel findTravelById(String travelId);

    Travel chooseTravel(String transporterName, String travelId);

    void finishTravel(String travelId);
}
