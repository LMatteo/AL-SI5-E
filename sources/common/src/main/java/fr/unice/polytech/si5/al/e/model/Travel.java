package fr.unice.polytech.si5.al.e.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Travel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    private String departure;

    @NotNull
    private String destination;

    private String state;

    @OneToMany(cascade = CascadeType.PERSIST)
    private Set<Item> items;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Customer transporter;

    public Travel() {
        this.items = new HashSet<>();
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public Set<Item> getItems() {
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

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getId() {
        return id;
    }
}
