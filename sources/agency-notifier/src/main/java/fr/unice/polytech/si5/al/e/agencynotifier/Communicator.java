package fr.unice.polytech.si5.al.e.agencynotifier;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class Communicator {
    private static class Email{
        String from;
        String to;
        String message;

        public Email(String from, String to, String message) {
            this.from = from;
            this.to = to;
            this.message = message;
        }
    }
    private static List<Email> emails = new ArrayList<>();
    private static boolean send(Email email) {
        try {

            HttpClient httpClient = HttpClientBuilder.create().build();

            HttpRequestBase req;
            StringEntity postingString = null;//gson.tojson() converts your pojo to json
                postingString = new StringEntity("{'email':{'from':'" + email.from + "', 'to': '" + email.to + "' ,'message':'" + email.message + "'}}");
                System.out.println(postingString.toString());
            req = new HttpPost("http://localhost:9091/sendmail");
            ((HttpPost) req).setEntity(postingString);


            req.setHeader("Content-type", "application/json");
            HttpResponse execute = httpClient.execute(req);

            return true;
        } catch (Exception e) {
            return false;
        }

        }
    public static void sendToMailer(String from, String to, String message)  {
        Email e = new Email(from,to,message);
        if(send(e)) {
            if(!emails.isEmpty()) {
                emails.forEach(Communicator::send);
            }
        }else{
            emails.add(e);
        }
    }
}
