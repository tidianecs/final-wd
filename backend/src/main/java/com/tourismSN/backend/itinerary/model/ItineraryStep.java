package com.tourismSN.backend.itinerary.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tourismSN.backend.destination.model.Destination;
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name = "itinerary_steps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItineraryStep {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itinerary_id", nullable = false)
    private Itinerary itinerary;
 
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_id", nullable = false)
    private Destination destination;
 
    private Integer dayNumber;
    private Integer orderIndex; 
    private String  notes; 
}