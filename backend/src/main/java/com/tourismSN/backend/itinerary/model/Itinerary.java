package com.tourismSN.backend.itinerary.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.tourismSN.backend.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "itineraries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"itineraries", "password", "authorities",
                            "accountNonExpired", "accountNonLocked",
                            "credentialsNonExpired", "enabled",
                            "hibernateLazyInitializer", "handler"})
    private User user;

    @Column(nullable = false)
    private String title;

    private Integer duration;

    // ← ItineraryStep ici, pas Itinerary
    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("dayNumber ASC, orderIndex ASC")
    @Builder.Default
    private List<ItineraryStep> steps = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}