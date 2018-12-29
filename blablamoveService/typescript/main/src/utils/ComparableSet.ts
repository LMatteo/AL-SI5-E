import {Comparable} from "../entity/Comparable";

export class ComparableSet<T extends Comparable> extends Array<T>{

    public contain(obj: T): boolean{
        if(this.getIndexOf(obj) === null){
            return false;
        } else {
            return true;
        }

    }

    public getIndexOf(obj: T) : number {
        for(let i :number = 0; i<this.length ; i++){
            if(this[i].equal(obj)) {
                return i;
            }
        }

        return null;
    }
}