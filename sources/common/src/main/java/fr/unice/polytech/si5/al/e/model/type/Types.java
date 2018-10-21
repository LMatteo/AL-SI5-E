package fr.unice.polytech.si5.al.e.model.type;

public enum Types {
    HIGHTECH("hightech"),
    FRAGILE("fragile"),
    HEAVY("heavy");

    private String name;

    Types(String type){
        this.name = type;
    }

    public static Types getTypeFromString(String name){
        for(Types type : Types.values()){
            if(type.name.equals(name)){
                return type;
            }
        }

        return null;
    }
}
