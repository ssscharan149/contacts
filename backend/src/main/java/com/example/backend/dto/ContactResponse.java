package com.example.backend.dto;

public record ContactResponse(
        Long id,
        String name,
        String phoneNumber,
        Boolean favourite,
        String email,
        Long userId
) {
}
