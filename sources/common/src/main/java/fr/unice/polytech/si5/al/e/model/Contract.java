package fr.unice.polytech.si5.al.e.model;

import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
public class Contract implements Serializable {

    @OneToOne(cascade = CascadeType.PERSIST)
    private Contact contact;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    private Types type;

    @NotNull
    private String description;

    public Contract() {
    }

    public Types getType() {
        return type;
    }

    public void setType(Types type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    @Override
    public String toString() {
        return "Contract{" +
                ", id=" + id +
                '}';
    }
}
