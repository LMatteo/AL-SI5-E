package extern.mailer;
import com.google.gson.Gson;
import org.json.JSONObject;
import spark.Spark;

import static spark.Spark.*;

public class MailServer {
    public static void main(String[] args) {
        Spark.port(9091);
        post("/sendmail", (request, response) -> {
            JSONObject object = new JSONObject(request.body()).getJSONObject("email");
            System.out.println("From: " + object.getString("from"));
            System.out.println("To: " +  object.getString("to"));
            System.out.println("Body :" +  object.getString("message"));
            System.out.println("----------------------------------");
            response.status(200);
            return "Sent";
        });

    }
}
