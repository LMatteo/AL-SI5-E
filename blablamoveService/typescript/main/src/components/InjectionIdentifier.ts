import {Validate} from "./insurance-validator/Validate";

const COMPONENT_IDENTIFIER = {
    Notify: Symbol.for("Notify"),
    RegisterInsurer: Symbol.for("RegisterInsurer"),
    GetSubscription: Symbol.for("GetSubscription"),
    Subscription: Symbol.for("Subscription"),
    ListContract: Symbol.for("ListContract"),
    Validate: Symbol.for("Validate"),
    ControlTravels: Symbol.for("ControlTravels"),
    InsuranceValidate: Symbol.for("InsuranceValidate"),
    PathValidate: Symbol.for("PathValidate"),
    HandleContract: Symbol.for("HandleContract")
};

export default COMPONENT_IDENTIFIER;