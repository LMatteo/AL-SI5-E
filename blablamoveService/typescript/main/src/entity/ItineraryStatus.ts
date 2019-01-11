import { Comparable } from "./Comparable";

export class ItineraryStatus implements Comparable{
   
    private issueOnTravel: boolean;
    private details: string;

    equal(object: any): boolean {
        throw new Error("Method not implemented.");
    }
}