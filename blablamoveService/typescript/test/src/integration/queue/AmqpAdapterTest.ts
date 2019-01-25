import "reflect-metadata";

import { Contact } from "../../../../main/src/entity/contact/Contact";
import { Connection } from "typeorm";
import * as assert from "assert";

import { Contract } from "../../../../main/src/entity/contract/Contract";
import { Type } from "../../../../main/src/entity/Type";
import { Item } from "../../../../main/src/entity/item/Item";
import { Validator } from "../../../../main/src/entity/validator/Validator";
import { Travel } from "../../../../main/src/entity/travel/Travel";
import { Customer } from "../../../../main/src/entity/customer/Customer";
import container from "../../../../main/src/components/InjectionConfig";
import COMPONENT_IDENTIFIER from "../../../../main/src/components/InjectionIdentifier";
import {MessageQueue} from "../../../../main/src/components/message-queue/MessageQueue";

describe("amqpTest", function() {
    let messageQueue:MessageQueue;

    beforeEach(() => {
        messageQueue = container.get(COMPONENT_IDENTIFIER.MessageQueue);
        messageQueue.initialize();
    });

    it("should receive message sent to the queue", function() {
        let result: Travel = undefined;
        MessageQueue.exchangeValidation.activateConsumer(msg => {result = (<Travel>msg.getContent());console.log("Received message")} );
        let travel:Travel  = new Travel();
        messageQueue.sendMessage(MessageQueue.VALIDATION_QUEUE, travel);
        console.log("Sent!");

    });

});
