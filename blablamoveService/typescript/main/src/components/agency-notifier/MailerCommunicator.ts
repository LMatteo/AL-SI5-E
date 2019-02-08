import * as http from "http";

export class MailerCommunicator{
    public static serverUrl: String = process.env.mailer || "localhost";


    private static getOptions(): any{
        return  {
            host: this.serverUrl,
            port: 9091,
            path: '/sendmail',
            method: 'POST'
        };

    }

    public static sendMail(from: String, to:String, message:String): void{



        let request :http.ClientRequest = http.request(MailerCommunicator.getOptions(), function (res) {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });


        let data = {
            email: {
                from: from,
                to: to,
                message: message
            }
        };

        request.write(JSON.stringify(data));

        request.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
        request.end();
    }


}