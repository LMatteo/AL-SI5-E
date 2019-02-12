import * as Amqp from "amqp-ts";
import {Contract} from "../entity/Contract";


export class Queue {

    private readonly host: string;
    private queueConnection: Amqp.Connection;
    private exchange: Amqp.Exchange;
    private queue: Amqp.Queue;
    private consumer: ((contract:Contract) => void);
    public static CONTRACTS_QUEUE: string = "contracts";

    constructor(host: string) {
        this.host = host;
    }
    public async initializeConnection(): Promise<void>{
        console.log("initializeConnection "+this.host);
        this.queueConnection = new Amqp.Connection(this.host);

        // Queue validation
        this.exchange = this.queueConnection.declareExchange(
            "contractExchange"
        );

        this.queue =  this.queueConnection.declareQueue(Queue.CONTRACTS_QUEUE);

        await this.queue.bind(this.exchange);
        this.queue.activateConsumer(message => {
            console.log(message.getContent());
            this.consumer(new Contract("type", []))
        });
        console.log("connection initialized");
    }
    public setConsumer(consumer:(contract:Contract) => void): void {
        this.consumer = consumer;
    }
}