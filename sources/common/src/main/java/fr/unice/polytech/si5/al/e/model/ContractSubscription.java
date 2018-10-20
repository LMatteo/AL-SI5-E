package fr.unice.polytech.si5.al.e.model;

public class ContractSubscription {
    private Contract contract;
    private Customer customer;

    public ContractSubscription(Contract contract) {
        this.contract = contract;
    }

    public Contract getContract() {
        return contract;
    }
}
