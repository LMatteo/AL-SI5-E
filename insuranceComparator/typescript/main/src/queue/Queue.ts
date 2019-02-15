import * as Amqp from "amqp-ts";
import {Contract} from "../entity/Contract";
import {Policy} from "../entity/Policy";


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
            var jsonContract = JSON.parse(message.getContent());

            let policies: Policy[] = [];
            for (let i = 0; i < jsonContract.policies.length; i++) {
                policies.push(new Policy(jsonContract.policies[i].name,jsonContract.policies[i].price));
            }
            let contract = new Contract(jsonContract.id, jsonContract.type, policies);
            this.consumer(contract)
        });
        console.log("connection initialized");
    }
    public setConsumer(consumer:(contract:Contract) => void): void {
        this.consumer = consumer;
    }
}