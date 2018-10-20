package fr.unice.polytech.si5.al.e.model;

import fr.unice.polytech.si5.al.e.model.type.Types;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Contract {


    //not sure about this attribute
    private Contact contact;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


    private Types type;
    private String description;

    public Contract() {
    }

    public Contract(Contact contact) {
        this.contact = contact;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Contract{" +
                "contact=" + contact +
                ", id=" + id +
                '}';
    }
}
