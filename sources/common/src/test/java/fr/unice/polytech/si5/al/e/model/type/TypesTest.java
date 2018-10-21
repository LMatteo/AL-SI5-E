package fr.unice.polytech.si5.al.e.model.type;

import org.junit.Assert;
import org.junit.Test;

public class TypesTest {

    @Test
    public void fromStringTest(){
        Types fragile = Types.getTypeFromString("fragile");

        Assert.assertEquals(Types.FRAGILE,fragile);
    }

    @Test
    public void noTypesTest(){
        Types noSuchType = Types.getTypeFromString("azeazeaz");

        Assert.assertNull(noSuchType);
    }
}
