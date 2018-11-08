package fr.unice.polytech.si5.al.e.model.type;

public enum  MessageType {
    VALIDATION("validation"),END_NOTIFICATION("endNotif");

    private String val;

    MessageType(String type){
        this.val = type;
    }

    public String toString() {
        return val;
    }
}
