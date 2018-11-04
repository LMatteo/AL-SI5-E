package scenario;

import com.google.gson.Gson;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.*;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import scenario.pojo.TravelCreation;

import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Scanner;

public class Main {
    private enum MethodType {
        POST, GET, PUT, DELETE
    }

    private static String customerWsUrl = "http://localhost:9090/blabla-move-backend/";

    public static String call(MethodType type, String route, String jsonData) throws IOException {

        HttpClient httpClient = HttpClientBuilder.create().build();

        HttpRequestBase req;
        StringEntity postingString = null;//gson.tojson() converts your pojo to json
        try {
            postingString = new StringEntity(jsonData);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        System.out.println("Route " + type + " " + route + " : " + jsonData);
        switch (type) {
            case POST:
                req = new HttpPost(route);
                ((HttpPost) req).setEntity(postingString);
                req.setHeader("Content-type", "application/json");
                break;
            case GET:
                req = new HttpGet(route);
                break;
            case PUT:
                req = new HttpPut(route);
                ((HttpPut) req).setEntity(postingString);
                req.setHeader("Content-type", "application/json");
                break;
            case DELETE:
                req = new HttpDelete(route);
                break;
            default:
                throw new RuntimeException();
        }

        HttpResponse execute = httpClient.execute(req);


        String s = EntityUtils.toString(execute.getEntity());
        System.out.println("Response : " + s);
        return s;

    }
    public static int createTravel(String from, String to, String customer) throws IOException {
        TravelCreation tc = new TravelCreation(customer, from, to);
        String creationResponse = call(MethodType.POST, customerWsUrl + "travels/", "{\"travel\":"+new Gson().toJson(tc)+"}");

        return Integer.parseInt(creationResponse);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Celine souhaite faire transporter son ordinateur et sa commode vers sa nouvelle ville.");
        try {
            sc.nextLine();
            int travelId = createTravel("Paris", "Nice", "Celine");
            System.out.println("Celine ajoute les objets qu'elle souhaite transporter.");
            sc.nextLine();

            String resp2 = call(MethodType.PUT, customerWsUrl + "travels/" + travelId, "{\"item\":{\"itemName\":\"Ordinateur gameur\"}}");

            System.out.println("Céline interroge les types de contrats d'assurance avec des critères : \n\tPour son ordinateur, elle cherche un contrat high-tech");
            sc.nextLine();
            String resp3 = call(MethodType.GET, customerWsUrl + "contracts/hightech", "{}");
            System.out.println("\tPour sa commode, elle choisit un contrat lourd");
            sc.nextLine();
            String resp4 = call(MethodType.GET, customerWsUrl + "contracts/heavy", "{}");

            System.out.println("N’ayant pas d’assurance alors que celle ci est obligatoire, elle décide de souscrire à un contrat d’assurance.");
            sc.nextLine();

            String res = call(MethodType.POST, customerWsUrl + "subscribe", "{\"contract\" : {}}");

            System.out.println("\tJean recherche les déménagements qui suivent son trajet");
            sc.nextLine();
            String travelsList = call(MethodType.GET, customerWsUrl + "travels?departure=Paris&destination=Nice", "");

            System.out.println("Jean décide de prendre l’ordinateur de Celine et a déjà sa propre assurance.");
            sc.nextLine();

            String tt = call(MethodType.GET, customerWsUrl + "subscribe", "{\"contract\" : {}}");

            System.out.println("\tJean se définit en tant que déménageur pour le trajet avec l'ordinateur");

            System.out.println("Julien décide de prendre commode de Celine et décide de souscrire à un contrat d’assurance sur BlaBlaMove.");
            sc.nextLine();
            System.out.println("\tJulien recherche les déménagements qui suivent son trajet");

            String dd = call(MethodType.GET, customerWsUrl + "travels?departure=Paris&destination=Nice", "");

            System.out.println("Jean se définit en tant que déménageur pour le trajet avec l'ordinateur");
            String test = call(MethodType.POST, customerWsUrl + "travels/", "{}");


            System.out.println("Jean liste les contrats pour choisir un adapté");
            String resp11 = call(MethodType.GET, customerWsUrl + "contracts/heavy", "{}");

            String jeanSub = call(MethodType.POST, customerWsUrl + "subscribe", "{}");

            System.out.println("Julien et Jean effectuent le transport.");

            String finishTravelResp = call(MethodType.DELETE, customerWsUrl + "travels/" + travelId, "{}");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}