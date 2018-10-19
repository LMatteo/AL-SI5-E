package fr.unice.polytech.si5.al.e.model;

public class ContractSubscription {
    private Contract contract;

    public ContractSubscription(Contract contract) {
        this.contract = contract;
    }

    public Contract getContract() {
        return contract;
    }
}
