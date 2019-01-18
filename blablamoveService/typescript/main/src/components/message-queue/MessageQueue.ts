import { Receiver } from "./Receiver";
import { injectable } from "inversify";

@injectable()
export class MessageQueue{
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
    
    sendMessage(topic:string, data: Object){
        for (let i = 0; i < this.queue.length; i++) {
            const element = this.queue[i];
            if(element.topic == topic){
                for (let j = 0; j < element.receivers.length; j++) {
                    const receiver = element.receivers[j];
                    receiver.onMessage(data);
                }
                return true;
            }
        }
        return false;
    }
}