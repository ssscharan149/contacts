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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> create(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.create(request));
    }

    @GetMapping
    public List<ContactResponse> getAll() {
        return contactService.getAll();
    }

    @GetMapping("/{contactId}")
    public ContactResponse getById(@PathVariable Long contactId) {
        return contactService.getById(contactId);
    }

    @PutMapping("/{contactId}")
    public ContactResponse update(
            @PathVariable Long contactId,
            @Valid @RequestBody ContactRequest request
    ) {
        return contactService.update(contactId, request);
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> delete(@PathVariable Long contactId) {
        contactService.delete(contactId);
        return ResponseEntity.noContent().build();
    }
}
