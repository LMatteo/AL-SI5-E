import 'mocha';
import Assert = require('assert');
import {Comparable} from "../../../main/src/entity/Comparable";
import {ComparableSet} from "../../../main/src/utils/ComparableSet";

class TestComparable implements Comparable{
    private readonly id : number;

    constructor(id: number){
        this.id = id;
    }

    equal(object: any): boolean {
        if(!(object instanceof TestComparable)) return false;
        return this.id === object.id
    }

}

describe("comparable set tests", () => {
    it('should not contain', function () {
        let set: ComparableSet<TestComparable> = new ComparableSet();
        set.push(new TestComparable(7));

        Assert.strictEqual(false,set.contain(new TestComparable(10)));
    });

    it('should contain', function () {
        let set: ComparableSet<TestComparable> = new ComparableSet();
        set.push(new TestComparable(7));

        Assert.strictEqual(true,set.contain(new TestComparable(7)));
    });

    it('should return null as index', function()  {
        let set: ComparableSet<TestComparable> = new ComparableSet();
        set.push(new TestComparable(7));

        Assert.strictEqual(null,set.getIndexOf(new TestComparable(10)));
    });

    it('should return the right index', function () {
        let set: ComparableSet<TestComparable> = new ComparableSet();
        set.push(new TestComparable(7));
        set.push(new TestComparable(4));
        set.push(new TestComparable(1));
        set.push(new TestComparable(6));

        Assert.strictEqual(1,set.getIndexOf(new TestComparable(4)));
    })
});