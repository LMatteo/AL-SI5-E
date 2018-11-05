package extern.mailer;
import com.google.gson.Gson;
import spark.Spark;

import static spark.Spark.*;

public class MailServer {
    public static void main(String[] args) {
        Spark.port(9091);
        post("/sendmail", (request, response) -> {
            Email mail = new Gson().fromJson(request.body(),Email.class);
            System.out.println("From: " + mail.getFrom());
            System.out.println("To: " + mail.getTo());
            System.out.println("Body :" + mail.getMessage());
            System.out.println("-------------------");
            response.status(200);
            return "Sent";
        });

    }
}
