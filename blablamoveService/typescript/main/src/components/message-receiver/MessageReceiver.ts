import { PathService } from "../path-service/PathService";
import { Validate } from "../insurance-validator/Validate";
import { Travel } from "../../entity/travel/Travel";
import { InsuranceValidator } from "../insurance-validator/InsuranceValidator";
import { Logger } from "../../logging/Logger";
import Level = require("../../logging/Level");
import {inject, injectable} from "inversify";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import { MessageQueue } from "../message-queue/MessageQueue";

@injectable()
export class MessageReceiver{
    private logger : Logger = new Logger();

    
    @inject(COMPONENT_IDENTIFIER.Validate)
    private validate: Validate;
    
    private messageQueue: MessageQueue;



    constructor( @inject(COMPONENT_IDENTIFIER.MessageQueue) messageQueue: MessageQueue){
        let ctx = this;
        this.messageQueue = messageQueue;
        this.messageQueue.subScribe("validation", {

            onMessage: function(message: Object){
                ctx.logger.log(Level.info, "receive msg validation : " + message);
                let travel: Travel = <Travel> message;
                ctx.validate.validate(travel);
            }
        });
        this.messageQueue.subScribe("end_notification", {
            onMessage: function(message: Object){
                
                 let travel: Travel = <Travel> message;
                 this.validate.notify(travel);
            }
        });
        
    }
}