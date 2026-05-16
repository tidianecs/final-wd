package com.tourismSN.backend.destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.tourismSN.backend.destination.model.BudgetRange;
import com.tourismSN.backend.destination.model.Category;
import com.tourismSN.backend.destination.model.Destination;
import java.util.List;
 
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    // Filtre dynamique — si un paramètre est null il est ignoré
    @Query("""
        SELECT d FROM Destination d
        WHERE (:region   IS NULL OR d.region      = :region)
        AND   (:category IS NULL OR d.category    = :category)
        AND   (:budget   IS NULL OR d.budgetRange = :budget)
        """)
    List<Destination> findWithFilters(
            @Param("region")   String region,
            @Param("category") Category category,
            @Param("budget")   BudgetRange budget
    );
}
