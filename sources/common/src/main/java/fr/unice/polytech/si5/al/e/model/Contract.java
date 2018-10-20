package fr.unice.polytech.si5.al.e.model;

import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
public class Contract implements Serializable {


    //not sure about this attribute
    //private Contact contact;

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

    @Override
    public String toString() {
        return "Contract{" +
                ", id=" + id +
                '}';
    }
}
