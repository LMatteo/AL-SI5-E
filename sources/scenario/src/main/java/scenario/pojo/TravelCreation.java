package scenario.pojo;

import javax.xml.bind.annotation.XmlElement;

public class TravelCreation {
    private String customerName;
    private String departure;
    private String destination;

    public TravelCreation(String customerName, String departure, String destination) {
        this.customerName = customerName;
        this.departure = departure;
        this.destination = destination;
    }

    public TravelCreation() {
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
}
