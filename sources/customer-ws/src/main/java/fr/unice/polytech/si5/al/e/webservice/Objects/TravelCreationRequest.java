package fr.unice.polytech.si5.al.e.webservice.Objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "travel")
@XmlAccessorType(XmlAccessType.FIELD)
public class TravelCreationRequest {
    @XmlElement
    private String customerName;

    @XmlElement
    private String departure;

    @XmlElement
    private String destination;

    public String getCustomerName() {
        return customerName;
    }

    public String getDeparture() {
        return departure;
    }

    public String getDestination() {
        return destination;
    }
}
