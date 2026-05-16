package com.tourismSN.backend.destination.model;
import jakarta.persistence.*;
import lombok.*;
 
@Entity
@Table(name = "destinations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String region;
    @Enumerated(EnumType.STRING)
    private Category category;
    private String imageUrl;
    // Coord for the leafleft
    private Double latitude;
    private Double longitude;
    @Enumerated(EnumType.STRING)
    private BudgetRange budgetRange;
}
