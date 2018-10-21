package fr.unice.polytech.si5.al.e.model;

import java.util.List;

public class Travel {
    private String start;
    private String end;

    List<Customer> customers;
    List<Item> items;
    Customer transporter;

    public void addItem(Item item) {
        items.add(item);
    }

    public void setTransporter(Customer transporter) {
        this.transporter = transporter;
    }
}
