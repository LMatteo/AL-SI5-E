import { PathService } from "../path-service/PathService";
import { Validate } from "../insurance-validator/Validate";
import { Travel } from "../../entity/travel/Travel";
import { InsuranceValidator } from "../insurance-validator/InsuranceValidator";
import { Logger } from "../../logging/Logger";
import Level = require("../../logging/Level");

export class MessageReceiver{
    private logger : Logger = new Logger();

    private validate: Validate = new InsuranceValidator();
    constructor(){
        let ctx = this;
        PathService.messageQueue.subScribe("validation", {

            onMessage: function(message: Object){
                ctx.logger.log(Level.info, "receive msg validation : " + message);
                let travel: Travel = <Travel> message;
                ctx.validate.validate(travel);
            }
        });
        PathService.messageQueue.subScribe("end_notification", {
            onMessage: function(message: Object){
                
                 let travel: Travel = <Travel> message;
                 this.validate.notify(travel);
            }
        });
        
    }
}