package fr.unice.polytech.si5.al.e.model.type;

import fr.unice.polytech.si5.al.e.model.Validator;
import org.junit.Assert;
import org.junit.Test;

public class ValidatorTest {

    @Test
    public void validatorCreationTest(){
        Assert.assertFalse(new Validator().isValid());
    }

    @Test
    public void validationTest(){
        Validator validator = new Validator();
        validator.setInsuranceValidation(true);
        Assert.assertFalse(new Validator().isValid());

        validator.setPathValidation(true);
        Assert.assertTrue(validator.isValid());
    }
}
