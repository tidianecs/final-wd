package com.tourismSN.backend.destination.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.tourismSN.backend.destination.model.Destination;
import com.tourismSN.backend.destination.service.DestinationService;
import java.util.List;
 
@RestController
@RequestMapping("/api/v1/destinations")
@RequiredArgsConstructor
public class DestinationController {
    private final DestinationService destinationService;
 
    @GetMapping
    public ResponseEntity<List<Destination>> getAll(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String budget) {
        return ResponseEntity.ok(destinationService.getAll(region, category, budget));
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<Destination> getById(@PathVariable Long id) {
        return ResponseEntity.ok(destinationService.getById(id));
    }
 
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Destination> create(@RequestBody Destination destination) {
        return ResponseEntity.ok(destinationService.create(destination));
    }
 
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Destination> update(@PathVariable Long id,
                                               @RequestBody Destination destination) {
        return ResponseEntity.ok(destinationService.update(id, destination));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        destinationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}