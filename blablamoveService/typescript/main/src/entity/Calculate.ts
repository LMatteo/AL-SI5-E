import { Type } from "./Type";

export class Calculate {


    calcule(from: string, to: string, contracts: Array<any>, objects: Array<any>, type: string): Array<any> { //calculate the price of each contract
        var coef = 1;
        var size = 1;
        if (type === Type.hightech) {
            coef = 1.5;
        } else if (type === Type.heavy) {
            coef = 2;
        }
        contracts.forEach(function (contract) {
            size = contract.id.length + from.length + to.length
            var price = (size - Math.floor(Math.random() * (size / 2)) + 1) * objects.length * coef
            if (objects.length > 3) {
                price / 1.3
            }
            contract.price = price;
        });
        return contracts;
    }

    searchType(objects: Array<any>): string { //search type of contract of list objects
        var nbHightech = 0;
        var nbFragile = 0;
        var nbHeavy = 0;
        objects.forEach(function (obj: { type: any; }) {
            if (obj.type === "hightech") {
                nbHightech++;
            } else if (obj.type === "fragile") {
                nbFragile++;
            } else {
                nbHeavy++;
            }
        });
        var max = Math.max(nbHightech, nbFragile, nbHeavy);
        if (max === nbFragile) {
            return "fragile"
        } else if (max === nbHightech) {
            return "hightech";
        } else {
            return "heavy"
        }
    }

}
