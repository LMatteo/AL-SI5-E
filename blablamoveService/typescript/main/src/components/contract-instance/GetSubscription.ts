import {Subscribe} from "../../entity/Subscribe";

export interface GetSubscription {
    getSubscriptions() : Array<Subscribe>;
    getSubscriptionById(id: string): Subscribe;
}