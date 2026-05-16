package com.tourismSN.backend.destination.service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.tourismSN.backend.destination.DestinationRepository;
import com.tourismSN.backend.destination.model.BudgetRange;
import com.tourismSN.backend.destination.model.Category;
import com.tourismSN.backend.destination.model.Destination;
import java.util.List;
 
@Service
@RequiredArgsConstructor
public class DestinationService {
    private final DestinationRepository destinationRepository;
 
    public List<Destination> getAll(String region, String category, String budget) {
        Category    cat = category != null ? Category.valueOf(category.toUpperCase())   : null;
        BudgetRange bud = budget   != null ? BudgetRange.valueOf(budget.toUpperCase())  : null;
        return destinationRepository.findWithFilters(region, cat, bud);
    }
 
    public Destination getById(Long id) {
        return destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + id));
    }
 
    public Destination create(Destination destination) {
        return destinationRepository.save(destination);
    }
 
    public Destination update(Long id, Destination updated) {
        Destination existing = getById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setRegion(updated.getRegion());
        existing.setCategory(updated.getCategory());
        existing.setImageUrl(updated.getImageUrl());
        existing.setLatitude(updated.getLatitude());
        existing.setLongitude(updated.getLongitude());
        existing.setBudgetRange(updated.getBudgetRange());
        return destinationRepository.save(existing);
    }
 
    public void delete(Long id) {
        destinationRepository.deleteById(id);
    }
}
