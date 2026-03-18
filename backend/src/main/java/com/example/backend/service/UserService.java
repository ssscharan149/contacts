package com.example.backend.service;

import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse create(UserRequest request) {
        User user = new User();
        user.setEmail(request.email());
        User saved = userRepository.save(user);
        return toResponse(saved);
    }

    public List<UserResponse> getAll() {
        return userRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public UserResponse getById(Long id) {
        return toResponse(findById(id));
    }

    public UserResponse update(Long id, UserRequest request) {
        User user = findById(id);
        user.setEmail(request.email());
        User updated = userRepository.save(user);
        return toResponse(updated);
    }

    public void delete(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(user.getUserId(), user.getEmail());
    }
}
