package fr.unice.polytech.si5.al.e.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Travel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    private String start;
    @NotNull
    private String end;

    private String state;

    @OneToOne(cascade = CascadeType.ALL)
    private Validator validator;

    @OneToMany
    private List<Item> items;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Customer transporter;

    public Travel() {
        this.items = new ArrayList<>();
        validator = new Validator();
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public List<Item> getItems() {
        return items;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Customer getTransporter() {
        return transporter;
    }

    public void setTransporter(Customer transporter) {
        this.transporter = transporter;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Validator getValidator() {
        return validator;
    }
}
