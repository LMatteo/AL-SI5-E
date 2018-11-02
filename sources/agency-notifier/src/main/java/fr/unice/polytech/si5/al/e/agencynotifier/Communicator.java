package fr.unice.polytech.si5.al.e.agencynotifier;

public class Communicator {
    public static void sendToMailer(String from, String to, String message){
        System.out.println("Mail : "+ from +" -> "+ to+" : " + message);
    }
}
