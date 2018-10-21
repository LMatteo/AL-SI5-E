package fr.unice.polytech.si5.al.e.model;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class Contact {
    @NotNull
    private String mail;

    public Contact(String mail) {
        this.mail = mail;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }
}
