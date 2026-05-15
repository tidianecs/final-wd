package com.tourismSN.backend.user.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.tourismSN.backend.user.DTO.UpdateProfileRequest;
import com.tourismSN.backend.user.DTO.UserProfileResponse;
import com.tourismSN.backend.user.model.User;
import com.tourismSN.backend.user.service.UserService;
 
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMe(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getProfile(user));
    }
 
    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateMe(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateProfileRequest req) {
        return ResponseEntity.ok(userService.updateProfile(user, req));
    }
}
