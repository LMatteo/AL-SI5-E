package fr.unice.polytech.si5.al.e.model.type;

import fr.unice.polytech.si5.al.e.model.exceptions.NoSuchTypeException;

public enum Type {
    HIGHTECH("hightech"),
    FRAGILE("fragile"),
    HEAVY("heavy");

    private String name;

    Type(String type){
        this.name = type;
    }

    public static Type getTypeFromString(String name) throws NoSuchTypeException {
        for(Type type : Type.values()){
            if(type.name.equals(name)){
                return type;
            }
        }

        throw new NoSuchTypeException();
    }
}
