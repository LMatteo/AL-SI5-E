import {Subscribe} from "../../entity/Subscribe";
import { ItineraryStatus } from "../../entity/ItineraryStatus";

export interface Notify {

    notifyContractReport( subscription: Subscribe, status:ItineraryStatus): void
    notifyContractRegister( newSubscribtion: Subscribe):void
}