import { Type } from "./Type";

export class Calculate {


    calcule(from: string, to: string, contracts: Array<any>, objects: Array<any>, type: string): Array<any> { //calculate the price of each contract
        var prix = 0;
        var coef = 1;
        var size = 1;
        if (type === Type.hightech) {
            coef = 1.5;
        } else if (type === Type.heavy) {
            coef = 2;
        }
        contracts.forEach(function (contract) {
            size = from.length + to.length
            prix = (size - Math.floor(Math.random() * size) + 1) * objects.length * coef * 4
            if (objects.length > 3) {
                prix / 1.3
            }
            contract.price = prix;
            console.log(prix)
        });
        console.log(contracts)
        return contracts;
    }

    searchType(objects: Array<any>): string { //search getType of contract of list objects
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
