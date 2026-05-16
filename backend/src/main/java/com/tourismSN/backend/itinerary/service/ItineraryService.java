package com.tourismSN.backend.itinerary.service;
import com.tourismSN.backend.destination.model.Destination;
import com.tourismSN.backend.itinerary.ItineraryRepository;
import com.tourismSN.backend.itinerary.DTO.ItineraryRequest;
import com.tourismSN.backend.itinerary.DTO.StepRequest;
import com.tourismSN.backend.itinerary.model.Itinerary;
import com.tourismSN.backend.itinerary.model.ItineraryStep;
import com.tourismSN.backend.destination.DestinationRepository;
import com.tourismSN.backend.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
 
@Service
@RequiredArgsConstructor
public class ItineraryService {
    private final ItineraryRepository   itineraryRepository;
    private final DestinationRepository destinationRepository;
 
    public List<Itinerary> getMyItineraries(User user) {
        return itineraryRepository.findByUserId(user.getId());
    }

    public Itinerary getById(Long id, User user) {
        return itineraryRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Itinerary not found"));
    }

    public Itinerary create(ItineraryRequest req, User user) {
        Itinerary itinerary = Itinerary.builder()
                .user(user)
                .title(req.getTitle())
                .duration(req.getDuration())
                .build();
 
        if (req.getSteps() != null) {
            for (StepRequest sr : req.getSteps()) {
                itinerary.getSteps().add(buildStep(sr, itinerary));
            }
        }
 
        return itineraryRepository.save(itinerary);
    }

    public Itinerary update(Long id, ItineraryRequest req, User user) {
        Itinerary itinerary = getById(id, user);
 
        itinerary.setTitle(req.getTitle());
        itinerary.setDuration(req.getDuration());
 
        itinerary.getSteps().clear();
 
        if (req.getSteps() != null) {
            for (StepRequest sr : req.getSteps()) {
                itinerary.getSteps().add(buildStep(sr, itinerary));
            }
        }
        return itineraryRepository.save(itinerary);
    }
 
    public void delete(Long id, User user) {
        Itinerary itinerary = getById(id, user);
        itineraryRepository.delete(itinerary);
    }
 
    private ItineraryStep buildStep(StepRequest sr, Itinerary itinerary) {
        Destination dest = destinationRepository.findById(sr.getDestinationId())
                .orElseThrow(() -> new RuntimeException(
                        "Destination not found with id: " + sr.getDestinationId()));
 
        return ItineraryStep.builder()
                .itinerary(itinerary)
                .destination(dest)
                .dayNumber(sr.getDayNumber())
                .orderIndex(sr.getOrderIndex())
                .notes(sr.getNotes())
                .build();
    }
}
