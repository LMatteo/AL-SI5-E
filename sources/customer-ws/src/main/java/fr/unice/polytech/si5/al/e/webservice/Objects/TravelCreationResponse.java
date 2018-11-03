package fr.unice.polytech.si5.al.e.webservice.Objects;

import com.google.gson.Gson;
import fr.unice.polytech.si5.al.e.model.holderObject.ContractHolder;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "travel")
@XmlAccessorType(XmlAccessType.FIELD)

public class TravelCreationResponse {
    @XmlElement(name = "id")
    private int id;

    public TravelCreationResponse(){}
    public TravelCreationResponse(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
    public String toJSON(){

            Gson gson = new Gson();
            return gson.toJson(this);
    }

}
