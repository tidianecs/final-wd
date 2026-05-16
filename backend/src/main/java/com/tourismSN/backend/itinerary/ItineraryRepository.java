package com.tourismSN.backend.itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tourismSN.backend.itinerary.model.Itinerary;
import java.util.List;
import java.util.Optional;
 
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    List<Itinerary> findByUserId(Long userId);
    Optional<Itinerary> findByIdAndUserId(Long id, Long userId);
}