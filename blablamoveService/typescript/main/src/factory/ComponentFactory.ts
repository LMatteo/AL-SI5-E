import {Component} from "../components/Component";
import {RegisterInsurer} from "../components/agency-notifier/RegisterInsurer";
import {AgencyNotifier} from "../components/agency-notifier/AgengyNotifier";
import {Notify} from "../components/agency-notifier/Notify";
import {ContractInstance} from "../components/contract-instance/ContractInstance";
import {GetSubscription} from "../components/contract-instance/GetSubscription";
import {Subscription} from "../components/contract-instance/Subscription";
import {HandleContract} from "../components/contract-registry/HandleContract";
import {ListContract} from "../components/contract-registry/ListContract";
import {InsuranceValidator} from "../components/insurance-validator/InsuranceValidator";
import {Validate} from "../components/insurance-validator/Validate";
import {PathService} from "../components/path-service/PathService";
import {ControlTravels} from "../components/path-service/ControlTravel";
import {TravelValidator} from "../components/travelValidator/TravelValidator";
import {PathValidate} from "../components/travelValidator/PathValidate";
import {InsuranceValidate} from "../components/travelValidator/InsuranceValidate";
import {ContractRegistry} from "../components/contract-registry/ContractRegistry";

class ComponentFactory {
    private constructorMap : Map<string,typeof Component>;
    constructor(){
        this.constructorMap = new Map();
        this.constructorMap.set("Notify",AgencyNotifier);
        this.constructorMap.set("RegisterInsurer",AgencyNotifier);
        this.constructorMap.set("Validate",InsuranceValidator);
        this.constructorMap.set("ControlTravels",PathService);
        this.constructorMap.set("InsuranceValidate",TravelValidator);
        this.constructorMap.set("PathValidate",TravelValidator);
        this.constructorMap.set("GetSubscription",ContractInstance);
        this.constructorMap.set("Subscription",ContractInstance);
    }
    public createComponent(type : "Notify") : Notify;
    public createComponent(type : "RegisterInsurer") : RegisterInsurer;
    public createComponent(type : "GetSubscription") : GetSubscription;
    public createComponent(type : "Subscription") : Subscription;
    public createComponent(type : "HandleContract") : HandleContract;
    public createComponent(type : "ListContract") : ListContract;
    public createComponent(type : "Validate") : Validate;
    public createComponent(type : "ControlTravels") : ControlTravels;
    public createComponent(type : "InsuranceValidate") : InsuranceValidate;
    public createComponent(type : "PathValidate") : PathValidate;
    public createComponent(type : string) : any  {
        console.log(type);
        return new (this.constructorMap.get(type))();
    }
}

export =new ComponentFactory();