package fr.unice.polytech.si5.al.e.model.type;

import fr.unice.polytech.si5.al.e.model.exceptions.NoSuchTypeException;
import org.junit.Assert;
import org.junit.Test;

public class TypesTest {

    @Test
    public void fromStringTest() throws Exception{
        Types fragile = Types.getTypeFromString("fragile");

        Assert.assertEquals(Types.FRAGILE,fragile);
    }

    @Test(expected = NoSuchTypeException.class)
    public void noTypesTest() throws Exception{
        Types noSuchType = Types.getTypeFromString("azeazeaz");
    }
}
