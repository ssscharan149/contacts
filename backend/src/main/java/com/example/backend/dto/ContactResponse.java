package com.example.backend.dto;

public record ContactResponse(
        Long id,
        String name,
        String phone,
        String email,
        String company,
        String city
) {
}
