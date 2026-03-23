package com.example.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ContactRequest(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Phone is required")
        String phone,
        @NotBlank(message = "Email is required")
        @Email(message = "Email format is invalid")
        String email,
        String company,
        String city
) {
}
