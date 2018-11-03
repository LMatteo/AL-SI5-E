package fr.unice.polytech.si5.al.e.model.type;

import fr.unice.polytech.si5.al.e.model.exceptions.NoSuchTypeException;
import org.junit.Assert;
import org.junit.Test;

public class TypesTest {

    @Test
    public void fromStringTest() throws Exception{
        Type fragile = Type.getTypeFromString("fragile");

        Assert.assertEquals(Type.FRAGILE,fragile);
    }

    @Test(expected = NoSuchTypeException.class)
    public void noTypesTest() throws Exception{
        Type noSuchType = Type.getTypeFromString("azeazeaz");
    }
}
