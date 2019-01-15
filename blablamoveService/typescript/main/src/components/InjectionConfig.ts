import "reflect-metadata";
import {Container} from "inversify";
import {Notify} from "./agency-notifier/Notify";
import COMPONENT_IDENTIFIER from "./InjectionIdentifier";
import {AgencyNotifier} from "./agency-notifier/AgengyNotifier";
import {RegisterInsurer} from "./agency-notifier/RegisterInsurer";
import {GetSubscription} from "./contract-instance/GetSubscription";
import {ContractInstance} from "./contract-instance/ContractInstance";
import {Subscription} from "./contract-instance/Subscription";
import {HandleContract} from "./contract-registry/HandleContract";
import {ContractRegistry} from "./contract-registry/ContractRegistry";
import {ListContract} from "./contract-registry/ListContract";
import {Validate} from "./insurance-validator/Validate";
import {InsuranceValidator} from "./insurance-validator/InsuranceValidator";
import {ControlTravels} from "./path-service/ControlTravel";
import {PathService} from "./path-service/PathService";
import {TravelValidator} from "./travelValidator/TravelValidator";
import {InsuranceValidate} from "./travelValidator/InsuranceValidate";
import {PathValidate} from "./travelValidator/PathValidate";


let container = new Container();

container.bind<Notify>(COMPONENT_IDENTIFIER.Notify).to(AgencyNotifier);
container.bind<RegisterInsurer>(COMPONENT_IDENTIFIER.RegisterInsurer).to(AgencyNotifier);
container.bind<GetSubscription>(COMPONENT_IDENTIFIER.GetSubscription).to(ContractInstance);
container.bind<Subscription>(COMPONENT_IDENTIFIER.Subscription).to(ContractInstance);
container.bind<HandleContract>(COMPONENT_IDENTIFIER.HandleContract).to(ContractRegistry);
container.bind<ListContract>(COMPONENT_IDENTIFIER.ListContract).to(ContractRegistry);
container.bind<Validate>(COMPONENT_IDENTIFIER.Validate).to(InsuranceValidator);
container.bind<ControlTravels>(COMPONENT_IDENTIFIER.ControlTravels).to(PathService);
container.bind<InsuranceValidate>(COMPONENT_IDENTIFIER.InsuranceValidate).to(TravelValidator);
container.bind<PathValidate>(COMPONENT_IDENTIFIER.PathValidate).to(TravelValidator);

export default container;