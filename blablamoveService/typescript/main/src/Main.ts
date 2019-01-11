import express = require("express");
import bodyParser = require("body-parser");
import Level = require("./logging/Level");
import {Logger} from "./logging/Logger";
import { MessageReceiver } from "./components/message-receiver/MessageReceiver";

let customerWs : express.Router = require("./route/CustomerWs");
let insurerWs : express.Router = require("./route/InsurerWs");

const receiver: MessageReceiver = new MessageReceiver();
const app : express.Express = express();
const logger : Logger = new Logger();


app.use(function (req: express.Request,res: express.Response,next : express.NextFunction) {
   logger.log(Level.info,"new request");
   next();
});
app.use(bodyParser.json());

app.use(function (req: express.Request,res: express.Response,next : express.NextFunction) {
   res.contentType("application/json");
   next();
});

app.use(function(error:Error,req: express.Request,res: express.Response,next : express.NextFunction){
   let errorMsg : any = {};
   if(error instanceof SyntaxError){
      logger.log(Level.error, "could not parse json input");
      res.status(400);
      errorMsg.message = "wrong json input";
   }
   res.send(JSON.stringify(errorMsg))
});

app.use('/blabla-move-backend',customerWs);
app.use('/blabla-move-backend',insurerWs);

app.listen(8080,() => {
   logger.log(Level.info,"listening on 8080");
});