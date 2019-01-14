import { Comparable } from "../Comparable";

export class Item implements Comparable {
    private name: string;

    public get $name(): string {
        return this.name;
    }

    public set $name(value: string) {
        this.name = value;
    }

    equal(object: any): boolean {
        if (!(object instanceof Item)) return false;
        return this.name === object.name;
    }
}
