package fr.unice.polytech.si5.al.e.messageReceiver;


import fr.unice.polytech.si5.al.e.insuranceValidator.Validate;
import fr.unice.polytech.si5.al.e.model.Travel;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.EJB;
import javax.ejb.MessageDriven;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;



@MessageDriven(activationConfig = {
        @ActivationConfigProperty( propertyName = "destinationType", propertyValue = "javax.jms.Queue"),
})

public class MessageReceiver implements MessageListener {

    @PersistenceContext
    private EntityManager memory;

    @EJB
    private Validate validate;

    private static final Logger log = Logger.getLogger(Logger.class.getName());


    @Override
    public void onMessage(Message message){
        log.log(Level.INFO,"MESSAGE RECEIVED");
        try {
            handleMessage(message);
        } catch (JMSException e){
            log.log(Level.WARNING,e.toString());
        }
    }

    protected void handleMessage(Message message) throws JMSException {

        try {
            String id = ((TextMessage) message).getText();
            Travel travel = findTravelById(Integer.parseInt(id));

            if(travel.getCustomer() != null && travel.getTransporter() != null){
                validate.validate(travel);
            }

            log.log(Level.WARNING,"RECEIVED TRAVEL CAN'T BE PROCESSED : MISSING INFORMATION");

        } catch (Exception e){
            log.log(Level.WARNING,e.toString());
            log.log(Level.WARNING,"RECEIVED TRAVEL CAN'T BE PROCESSED : ID CAN'T BE PROCESSED");
        }




    }

    //cheating for now until we can put travel object in the queue
    Travel findTravelById(int id) {
        CriteriaBuilder builder = memory.getCriteriaBuilder();
        CriteriaQuery<Travel> criteria = builder.createQuery(Travel.class);
        Root<Travel> root = criteria.from(Travel.class);
        criteria.select(root).where(builder.equal(root.get("id"), id));


        TypedQuery<Travel> query = memory.createQuery(criteria);
        return query.getSingleResult();
    }
}
