package holderObjects;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "contract")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContractAdderHolder {

    @XmlElement
    private String typeName;

    @XmlElement
    private String description;

    @XmlElement
    private String mail;

    public String getTypeName() {
        return typeName;
    }

    public String getDescription() {
        return description;
    }

    public String getMail() {
        return mail;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
