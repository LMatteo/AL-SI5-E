import { Receiver } from "./Receiver";
import COMPONENT_IDENTIFIER from "../InjectionIdentifier";
import { inject, injectable } from "inversify";
import { Validate } from "../insurance-validator/Validate";
import * as Amqp from "amqp-ts";
import { Travel } from "../../entity/travel/Travel";
import container from "../InjectionConfig";
@injectable()
export class MessageQueue {
    private static connection: Amqp.Connection;
    public static exchangeValidation: Amqp.Exchange;
    private static exchangeEndNotification: Amqp.Exchange;
    private static exchangeContracts: Amqp.Exchange;
    public static VALIDATION_QUEUE: string = "validation";
    public static END_NOTIFICATION_QUEUE: string = "end_notification";
    public static CONTRACTS_QUEUE: string = "contracts";
    @inject(COMPONENT_IDENTIFIER.Validate)
    private validate: Validate;

    public initialize() {
        if (this.validate === undefined) {
            this.validate = container.get(COMPONENT_IDENTIFIER.Validate);
            return;
        }
        let zis = this;
        if (MessageQueue.connection == undefined) {
            const host = process.env.qName || "localhost";
            MessageQueue.connection = new Amqp.Connection("amqp://" + host);

            // Queue validation
            MessageQueue.exchangeValidation = MessageQueue.connection.declareExchange(
                "ExchangeValidate"
            );
            var queue = MessageQueue.connection.declareQueue(
                MessageQueue.VALIDATION_QUEUE
            );
            queue.bind(MessageQueue.exchangeValidation);
            queue.activateConsumer(message => {
                let travel: Travel = Travel.deserialize(message.getContent());
                zis.validate.validate(travel);
            });

            // update contract
            MessageQueue.exchangeContracts = MessageQueue.connection.declareExchange(
                "exchangeContracts"
            );
            var queue2 = MessageQueue.connection.declareQueue(
                MessageQueue.CONTRACTS_QUEUE
            );
            queue2.bind(MessageQueue.exchangeContracts);

            // end notification queue
            MessageQueue.exchangeEndNotification = MessageQueue.connection.declareExchange(
                "ExchangeEndNotification"
            );
            var queue3 = MessageQueue.connection.declareQueue(
                MessageQueue.END_NOTIFICATION_QUEUE
            );
            queue3.bind(MessageQueue.exchangeEndNotification);
            queue3.activateConsumer(message => {
                let travelMarshalled = JSON.parse(message.getContent());
                let travel: Travel =  Travel.deserialize(travelMarshalled);
                zis.validate.notify(travel);
            });
        }
    }
    public constructor() {
    }

    public queue: { topic: string; receivers: Receiver[] }[] = [];
    subScribe(topic: string, receiver: Receiver):  Promise<void>  {
        for (let i = 0; i < this.queue.length; i++) {
            const element = this.queue[i];
            if (element.topic == topic) {
                element.receivers.push(receiver);
                return;
            }
        }
        this.queue.push({ topic: topic, receivers: [receiver] });
    }

    async sendMessage(topic: string, data: string):  Promise<void>  {

        var msg2 = new Amqp.Message(data);

        switch (topic) {
            case MessageQueue.VALIDATION_QUEUE:
                if (MessageQueue.exchangeValidation === undefined) {
                    this.initialize();
                }
                MessageQueue.exchangeValidation.send(msg2);
                break;
            case MessageQueue.END_NOTIFICATION_QUEUE:
                if (MessageQueue.exchangeEndNotification === undefined) {
                    this.initialize();
                }
                MessageQueue.exchangeEndNotification.send(msg2);
                break;
            case MessageQueue.CONTRACTS_QUEUE:
                if (MessageQueue.exchangeContracts === undefined) {
                    this.initialize();
                }
                MessageQueue.exchangeContracts.send(msg2);
                break;
        }

    }
}
