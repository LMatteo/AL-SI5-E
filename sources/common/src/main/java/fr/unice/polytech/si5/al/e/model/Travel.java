package fr.unice.polytech.si5.al.e.model;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
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

    @OneToOne(cascade = CascadeType.ALL)
    private Validator validator;

    @OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private Set<Item> items;

    @ManyToOne(cascade = CascadeType.ALL)
    private Customer customer;

    @ManyToOne(cascade = CascadeType.ALL)
    private Customer transporter;

    public Travel() {

        validator = new Validator();
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

    public Validator getValidator() {
        return validator;
    }

    public int getId() {
        return id;
    }

    public String toJSON() {
        JSONObject object = new JSONObject();
        object.put("id", id);
        object.put("departure", departure);
        object.put("destination", destination);
        if (!items.isEmpty()) {
            JSONArray itemsJson = new JSONArray();
            items.forEach(i -> itemsJson.put(i.getName()));
            object.put("items", itemsJson);
        }
        object.put("customer", customer.getName());
        if (transporter != null) {
            object.put("transporter", transporter.getName());
        }
        object.put("state", state);

        return object.toString();

    }
}
