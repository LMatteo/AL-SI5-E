import { Item } from "./Item";

export class ItemModel {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }

    static fromObj(obj: Item): ItemModel {
        return new ItemModel(obj.$name);
    }

    toItem(): Item {
        let item = new Item();
        item.$name = this.name;
        return item;
    }
}
