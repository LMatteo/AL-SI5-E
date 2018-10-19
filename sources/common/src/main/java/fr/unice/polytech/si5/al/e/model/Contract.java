package fr.unice.polytech.si5.al.e.model;
public class Contract {
    private Contact contact;
    private int id;

    public Contract() {
    }

    public Contract(int id, Contact contact) {
        this.id = id;
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
