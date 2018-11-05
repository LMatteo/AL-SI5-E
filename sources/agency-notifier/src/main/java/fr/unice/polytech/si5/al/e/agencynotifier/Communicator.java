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

public class Communicator {
    public static void sendToMailer(String from, String to, String message)  {
        try {

        HttpClient httpClient = HttpClientBuilder.create().build();

        HttpRequestBase req;
        StringEntity postingString = null;//gson.tojson() converts your pojo to json
        try {
            postingString = new StringEntity("{'email':{'from':'" + from + "', 'to': '" + to + "' ,'message':'" + message + "'}}");
            System.out.println(postingString.toString());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        req = new HttpPost("http://localhost:9091/sendmail");
        ((HttpPost) req).setEntity(postingString);


        req.setHeader("Content-type", "application/json");
        HttpResponse execute = httpClient.execute(req);


        String s = EntityUtils.toString(execute.getEntity());
            System.out.println("Response : " + s);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
