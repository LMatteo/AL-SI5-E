import { Receiver } from "./Receiver";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import {inject, injectable} from "inversify";
import { Validate } from "../insurance-validator/Validate";
import * as Amqp from "amqp-ts";
import { Travel } from "../../entity/travel/Travel";
import Level = require("../../logging/Level");
import container from "../InjectionConfig";
@injectable()
export class MessageQueue{
    private static connection: Amqp.Connection;
    private static exchangeValidation: Amqp.Exchange;
    private static exchangeEndNotification: Amqp.Exchange;
    public static VALIDATION_QUEUE: string = "validation";
    public static END_NOTIFICATION_QUEUE: string = "end_notification";
    @inject(COMPONENT_IDENTIFIER.Validate) 
    private validate: Validate;

    public initialize(){
        if(this.validate === undefined){
            this.validate = container.get(COMPONENT_IDENTIFIER.Validate);
            return;
        }
        let zis = this;
        if(MessageQueue.connection == undefined){
            console.log("init connect");
            MessageQueue.connection = new Amqp.Connection("amqp://localhost");
           
            // Queue validation
            MessageQueue.exchangeValidation = MessageQueue.connection.declareExchange("ExchangeValidate");
            var queue = MessageQueue.connection.declareQueue(MessageQueue.VALIDATION_QUEUE);
            queue.bind(MessageQueue.exchangeValidation);
            queue.activateConsumer((message) => {
                console.log("consume validate" + message.getContent());
                let travelMarshalled = JSON.parse(message.getContent());
                console.log("travelMarshalled",travelMarshalled);
                let travel: Travel = travelMarshalled;
                console.log(travel);
                travel.$customer = travelMarshalled.customer;
                travel.$customer.$name = travelMarshalled.customer.name;
                travel.$transporter = travelMarshalled.transporter;
                console.log(Level.info, "receive msg validation : " , travel);
                zis.validate.validate(travel);
            });

            // end notification queue
            MessageQueue.exchangeEndNotification = MessageQueue.connection.declareExchange("ExchangeEndNotification");
            var queue2 = MessageQueue.connection.declareQueue(MessageQueue.END_NOTIFICATION_QUEUE);
            queue2.bind(MessageQueue.exchangeEndNotification);
            queue2.activateConsumer((message) => {
                let travelMarshalled = JSON.parse(message.getContent());
                let travel: Travel = travelMarshalled;
                travel.$customer = travelMarshalled.customer;
                travel.$transporter = travelMarshalled.transporter;
                zis.validate.notify(travel);
            });

        }
    }
    public constructor(){
        console.log("construct Messagequeue");
       
       this.initialize();

    }

    public queue :{topic: string, receivers: Receiver[]}[] = []; 
    subScribe(topic:string,receiver: Receiver ){
        for (let i = 0; i < this.queue.length; i++) {
            const element = this.queue[i];
            if(element.topic == topic){
                element.receivers.push(receiver);
                return;
            }
        }
        this.queue.push({topic: topic, receivers: [receiver]});
    }
    
    sendMessage(topic:string, data: Travel){
        var marshalled :string= JSON.stringify(data, (key, value) => {
            if (key === "customer" || key === "transporter") {
                return {name: value.$name, id: value.$id};
            }
            return value;
        })
        console.log("Send message",marshalled)
        var msg2 = new Amqp.Message(marshalled);
        if(topic === MessageQueue.VALIDATION_QUEUE){
                console.log("VALIDATION_QUEUE");
                if( MessageQueue.exchangeValidation === undefined){
                    this.initialize();
                }
                MessageQueue.exchangeValidation.send(msg2);
        }else if(topic == MessageQueue.END_NOTIFICATION_QUEUE){
            
            console.log("END_NOTIFICATION_QUEUE");
            if( MessageQueue.exchangeEndNotification === undefined){
                this.initialize();
            }
            MessageQueue.exchangeEndNotification.send(msg2);
        }
    }
}