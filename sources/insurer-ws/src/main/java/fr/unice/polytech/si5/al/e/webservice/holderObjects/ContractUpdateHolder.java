package fr.unice.polytech.si5.al.e.webservice.holderObjects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "update")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContractUpdateHolder {

    @XmlElement
    private int id;

    @XmlElement
    private String description;

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }
}
