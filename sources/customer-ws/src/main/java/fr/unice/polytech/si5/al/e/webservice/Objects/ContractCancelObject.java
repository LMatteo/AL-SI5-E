package fr.unice.polytech.si5.al.e.webservice.Objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "cancel")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContractCancelObject {

    @XmlElement
    private int id;

    public int getId() {
        return id;
    }

}
