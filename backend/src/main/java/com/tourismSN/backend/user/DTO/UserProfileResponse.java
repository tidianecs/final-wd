package com.tourismSN.backend.user.DTO;

import lombok.*;
import java.time.LocalDateTime;
 
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    // The password is never give to the client
    private Long   id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private LocalDateTime createdAt;
}
