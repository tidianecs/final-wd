package com.tourismSN.backend.itinerary.controller;
import com.tourismSN.backend.itinerary.DTO.ItineraryRequest;
import com.tourismSN.backend.itinerary.model.Itinerary;
import com.tourismSN.backend.itinerary.service.ItineraryService;
import com.tourismSN.backend.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
 
@RestController
@RequestMapping("/api/v1/itineraries")
@RequiredArgsConstructor
public class ItineraryController {
    private final ItineraryService itineraryService;

    @GetMapping
    public ResponseEntity<List<Itinerary>> getMyItineraries(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(itineraryService.getMyItineraries(user));
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<Itinerary> getById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(itineraryService.getById(id, user));
    }
 
    @PostMapping
    public ResponseEntity<Itinerary> create(
            @RequestBody ItineraryRequest req,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(itineraryService.create(req, user));
    }
 
    @PutMapping("/{id}")
    public ResponseEntity<Itinerary> update(
            @PathVariable Long id,
            @RequestBody ItineraryRequest req,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(itineraryService.update(id, req, user));
    }
 
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        itineraryService.delete(id, user);
        return ResponseEntity.noContent().build();
    }
}