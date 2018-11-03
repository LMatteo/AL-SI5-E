package fr.unice.polytech.si5.al.e.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class ContractSubscription {

    @OneToOne(cascade = CascadeType.ALL)
    private Contract contract;

    @OneToOne(cascade = CascadeType.ALL)
    private Customer customer;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;


    public ContractSubscription() {
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }
}
