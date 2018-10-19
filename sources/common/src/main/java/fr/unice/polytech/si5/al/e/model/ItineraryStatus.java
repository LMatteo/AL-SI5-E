package fr.unice.polytech.si5.al.e.model;

public class ItineraryStatus {
    private boolean issueOnTravel;
    private String details;

    public ItineraryStatus(boolean issueOnTravel, String details) {
        this.issueOnTravel = issueOnTravel;
        this.details = details;
    }

    @Override
    public String toString() {
        return "ItineraryStatus{" +
                "issueOnTravel=" + issueOnTravel +
                ", details='" + details + '\'' +
                '}';
    }
}
