package com.tourismSN.backend.user.service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.tourismSN.backend.user.UserRepository;
import com.tourismSN.backend.user.DTO.UpdateProfileRequest;
import com.tourismSN.backend.user.DTO.UserProfileResponse;
import com.tourismSN.backend.user.model.User;
 
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserProfileResponse getProfile(User user) {
        return toResponse(user);
    }
 
    public UserProfileResponse updateProfile(User user, UpdateProfileRequest req) {
        if (req.getFirstName() != null) {
            user.setFirstName(req.getFirstName());
        }
        if (req.getLastName() != null) {
            user.setLastName(req.getLastName());
        }
 
        userRepository.save(user);
        return toResponse(user);
    }
 
    private UserProfileResponse toResponse(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .build();
    }
}