import { Comparable } from "../Comparable";

export class Item implements Comparable {
    private id: string;
    private name: string;

    public get $id(): string {
        return this.id;
    }

    public set $id(value: string) {
        this.id = value;
    }

    public get $name(): string {
        return this.name;
    }

    public set $name(value: string) {
        this.name = value;
    }

    equal(object: any): boolean {
        if (!(object instanceof Item)) return false;
        return this.id === object.id;
    }
}
