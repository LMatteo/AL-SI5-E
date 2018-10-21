package fr.unice.polytech.si5.al.e;

import fr.unice.polytech.si5.al.e.model.Customer;
import fr.unice.polytech.si5.al.e.model.Item;
import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.Local;
import java.util.List;

@Local
public interface ControlTravel {
    Travel createTravel(Customer customer, String departure, String destination);
    Travel addItemToTravel(Item item, Travel travel);
    List<Travel> findTravel(String departure, String destination);
    Travel chooseTravel(Customer transporter, Travel travel);
    void finishTravel(Travel travel);
}
