package fr.unice.polytech.si5.al.e.webservice.Objects;

import fr.unice.polytech.si5.al.e.model.Travel;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@XmlRootElement(name = "travels")
public class ListTravel {
    private List<Travel> travels;

    public ListTravel() {
        this.travels = new ArrayList<>();
    }


    @XmlElement(name = "travel")
    public List<Travel> getTravels() {
        return travels;
    }

    public void setTravels(List<Travel> travels) {
        this.travels = travels;
    }

    public String toJSON(){
        return "[" + travels.stream().map(Travel::toJSON).collect(Collectors.joining(",")) + "]";
    }
}
