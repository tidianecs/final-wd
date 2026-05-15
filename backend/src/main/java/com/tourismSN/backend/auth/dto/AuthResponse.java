package com.tourismSN.backend.auth.dto;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    // Return Token for the client
    private String accessToken;
    private String refreshToken;

    private Long   userId;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
}