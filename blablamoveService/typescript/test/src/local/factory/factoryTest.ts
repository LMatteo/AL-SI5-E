import ComponentFactory = require("../../../../main/src/factory/ComponentFactory");
import assert = require("assert");
import {ContractHandlerFactory} from "../../../../main/src/factory/ContractHandlerFactory";


describe('factory test', function () {
    it('should return the right object', function () {
        assert.strictEqual(true,(ContractHandlerFactory.getComponent()) !== undefined);
        assert.strictEqual(true,(ComponentFactory.createComponent("Notify")) !== undefined);
        assert.strictEqual(true,(ComponentFactory.createComponent("RegisterInsurer")) !== undefined);
        assert.strictEqual(true,(ComponentFactory.createComponent("GetSubscription")) !== undefined);
        assert.strictEqual(true,(ComponentFactory.createComponent("Subscription")) !== undefined);
        assert.strictEqual(true,(ComponentFactory.createComponent("Validate")) !== undefined);
        assert.strictEqual(true,(ComponentFactory.createComponent("ControlTravels")) !== undefined);
        assert.strictEqual(true,(ComponentFactory.createComponent("InsuranceValidate")) !== undefined);
        assert.strictEqual(true,(ComponentFactory.createComponent("PathValidate")) !== undefined);
    });
});