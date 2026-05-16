package com.tourismSN.backend.itinerary.DTO;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
 
@Getter
@Setter
public class ItineraryRequest {
    private String title;
    private Integer duration;
    private List<StepRequest> steps;
}