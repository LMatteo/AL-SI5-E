package fr.unice.polytech.si5.al.e.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Customer {
    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private String name;

    @OneToMany(cascade = CascadeType.PERSIST)
    private Set<Item> items;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.PERSIST)
    private Set<Travel> shipments;

    @OneToMany(mappedBy = "transporter", cascade = CascadeType.PERSIST)
    private Set<Travel> transports;

    public Customer() {
        this.items = new HashSet<>();
        this.shipments = new HashSet<>();
        this.transports = new HashSet<>();
    }

    public void addTravel(Travel travel) {
        shipments.add(travel);
    }

    public void chooseTravel(Travel travel) {
        transports.add(travel);
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public Set<Item> getItems() {
        return items;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int hashCode() {
        return this.id;
    }

    @Override
    public boolean equals(Object obj) {
        if(obj == this) return true;
        if(!(obj instanceof Customer)) return false;

        return ((Customer) obj).id == this.id;
    }
}
