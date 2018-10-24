package fr.unice.polytech.si5.al.e.webservice.holderObjets;

import com.google.gson.Gson;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

public class ContractHolder {

    private int id;

    private String mail;

    private String description;

    public ContractHolder(){

    }

    public ContractHolder(int id, String mail, String description) {
        this.id = id;
        this.mail = mail;
        this.description = description;
    }

    public String toJson(){
        Gson gson = new Gson();

        return gson.toJson(this);
    }

    public static String toJson(List<ContractHolder> holders){

        Gson gson = new Gson();
        return gson.toJson(holders);
    }
}
