package com.example.backend.controller;

import com.example.backend.dto.ContactRequest;
import com.example.backend.dto.ContactResponse;
import com.example.backend.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/users/{userId}/contacts")
    public ResponseEntity<ContactResponse> create(
            @PathVariable Long userId,
            @Valid @RequestBody ContactRequest request
    ) {
        ContactResponse response = contactService.create(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/users/{userId}/contacts")
    public List<ContactResponse> getAllByUser(@PathVariable Long userId) {
        return contactService.getAllByUser(userId);
    }

    @GetMapping("/contacts/{contactId}")
    public ContactResponse getById(@PathVariable Long contactId) {
        return contactService.getById(contactId);
    }

    @PutMapping("/contacts/{contactId}")
    public ContactResponse update(
            @PathVariable Long contactId,
            @Valid @RequestBody ContactRequest request
    ) {
        return contactService.update(contactId, request);
    }

    @PatchMapping("/contacts/{contactId}/favorite")
    public ContactResponse toggleFavourite(@PathVariable Long contactId) {
        return contactService.toggleFavourite(contactId);
    }

    @PatchMapping("/contacts/{contactId}/favorite/true")
    public ContactResponse markFavouriteTrue(@PathVariable Long contactId) {
        return contactService.markFavouriteTrue(contactId);
    }

    @DeleteMapping("/contacts/{contactId}")
    public ResponseEntity<Void> delete(@PathVariable Long contactId) {
        contactService.delete(contactId);
        return ResponseEntity.noContent().build();
    }
}
