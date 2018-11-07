package fr.unice.polytech.si5.al.e.webservice.Objects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "contract")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContractSubscribeObject {

    @XmlElement
    private int idContract;

    @XmlElement
    private int idCustomer;

    public int getIdContract() {
        return idContract;
    }

    public int getIdCustomer() {
        return idCustomer;
    }
}
