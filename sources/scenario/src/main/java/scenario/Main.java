package scenario;

import com.google.gson.Gson;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.*;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import scenario.pojo.TravelCreation;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class Main {
    private enum MethodType {
        POST, GET, PUT, DELETE
    }
    private static Scanner scanner = new Scanner(System.in);
    private static void pause(String message){
        System.out.println(message);
        scanner.nextLine();
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

    public static List<Integer> createTravels(String from, String to, String customer, List<String> objects) throws IOException {
        List<Integer> travelsIds = new ArrayList<>();
        objects.forEach(ob -> {
            try {
                pause("Celine crée le trajet pour son objet " + ob);
                TravelCreation tc = new TravelCreation(customer, from, to);
                String creationResponse = call(MethodType.POST, customerWsUrl + "travels/", "{\"travel\":" + new Gson().toJson(tc) + "}");
                int travelId = Integer.parseInt(creationResponse);
                travelsIds.add(travelId);
                String resp2 = call(MethodType.PUT, customerWsUrl + "travels/" + travelId, "{\"item\":{\"itemName\":\"" + ob + "\"}}");
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        return travelsIds;
    }

    public static void main(String[] args) throws IOException {
        pause("Celine souhaite faire transporter son ordinateur et sa commode vers sa nouvelle ville.\nElle définit les objets à transporter dans notre système.");
        try {
            List<Integer> travelIds = createTravels("Paris", "Nice", "Celine", Arrays.asList("Ordinateur gameur","Commode"));

            pause("Céline interroge les types de contrats d'assurance avec des critères : \n\tPour son ordinateur, elle cherche un contrat high-tech");
            String resp3 = call(MethodType.GET, customerWsUrl + "contracts/hightech", "{}");
            JSONArray contractsResp = new JSONArray(resp3);
            if(contractsResp.length() < 1){
                System.out.println("Aucun contrat n'est disponible dans le système.");
                System.exit(0);
            }
            JSONObject firstContract = contractsResp.getJSONObject(0);
            firstContract.put("typeName", "hightech");
            firstContract.put("idCustomer", "celine");
            pause("Il y a " + contractsResp.length() + " contrat d'assurance qui correspond à ce critère");

            pause("\tPour sa commode, elle choisit un contrat lourd");
            String resp4 = call(MethodType.GET, customerWsUrl + "contracts/heavy", "{}");

            pause("N’ayant pas d’assurance alors que celle ci est obligatoire, elle décide de souscrire à un contrat d’assurance.");

            String res = call(MethodType.POST, customerWsUrl + "subscribe", "{\"contract\" : " + firstContract.toString() + "}");

            pause("Celine n'a plus qu'à attendre ...\n-------------------------");

            pause("Jean recherche les déménagements qui suivent son trajet");
            String travelsList = call(MethodType.GET, customerWsUrl + "travels?departure=Paris&destination=Nice", "");
            JSONArray travels = new JSONArray(travelsList);
            pause("Jean décide de prendre l’ordinateur de Celine et a déjà sa propre assurance.");
            pause("\tJean se définit en tant que déménageur pour le trajet avec l'ordinateur");
            String test2 = call(MethodType.PUT, customerWsUrl + "travels/" + travelIds.get(1) + "/transporter",
                    "{'travel':{'transporterName':'Jean'}}");

            pause("Julien décide de prendre la commode de Celine et décide de souscrire à un contrat d’assurance sur BlaBlaMove.");
            pause("\tJulien recherche les déménagements qui suivent son trajet");

            String dd = call(MethodType.GET, customerWsUrl + "travels?departure=Paris&destination=Nice", "");

            pause("Jean se définit en tant que déménageur pour le trajet avec l'ordinateur");
            String testee = call(MethodType.PUT, customerWsUrl + "travels/" + travelIds.get(0) + "/transporter",
                    "{'travel':{'transporterName':'Jean'}}");


            pause("Jean liste les contrats pour choisir un adapté");

            String resp11 = call(MethodType.GET, customerWsUrl + "contracts/heavy", null);
            contractsResp = new JSONArray(resp3);
            JSONObject jeanContract = contractsResp.getJSONObject(0);
            jeanContract.put("typeName", "heavy");
            jeanContract.put("idCustomer", "jean");
            pause("Julien et Jean effectuent le transport.");

            String finishTravelResp = call(MethodType.DELETE, customerWsUrl + "travels/" + travelIds.get(0), "{}");
            String finishTravel2Resp = call(MethodType.DELETE, customerWsUrl + "travels/" + travelIds.get(1), "{}");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}