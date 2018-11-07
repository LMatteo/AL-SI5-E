package fr.unice.polytech.si5.al.e.model.holderObject;

import com.google.gson.Gson;
import fr.unice.polytech.si5.al.e.model.type.MessageType;

public class MessageHolder {
    private MessageType type;
    private int travelId;

    public MessageHolder(MessageType type, int travelId) {
        this.type = type;
        this.travelId = travelId;
    }

    public MessageType getType() {
        return type;
    }

    public int getTravelId() {
        return travelId;
    }

    public String toJsonString(){
        Gson gson = new Gson();

        return gson.toJson(this);
    }

    public static MessageHolder fromJson(String json){
        Gson gson = new Gson();

        return gson.fromJson(json,MessageHolder.class);
    }

    @Override
    public int hashCode() {
        return type.toString().hashCode() + travelId;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if(!(obj instanceof MessageHolder)) return false;
        return ((MessageHolder) obj).travelId == this.travelId && ((MessageHolder) obj).type == this.type;
    }
}
