package com.tourismSN.backend.itinerary.DTO;
import lombok.Getter;
import lombok.Setter;
 
@Getter
@Setter
public class StepRequest {
    private Long destinationId;
    private Integer dayNumber;
    private Integer orderIndex;
    private String  notes;
}
