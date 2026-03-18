package com.example.backend.service;

import com.example.backend.dto.ContactRequest;
import com.example.backend.dto.ContactResponse;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Contact;
import com.example.backend.model.User;
import com.example.backend.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;
    private final UserService userService;

    public ContactService(ContactRepository contactRepository, UserService userService) {
        this.contactRepository = contactRepository;
        this.userService = userService;
    }

    public ContactResponse create(Long userId, ContactRequest request) {
        User user = userService.findById(userId);

        Contact contact = new Contact();
        contact.setName(request.name());
        contact.setPhoneNumber(request.phoneNumber());
        contact.setEmail(request.email());
        contact.setFavourite(request.favourite() != null ? request.favourite() : Boolean.FALSE);
        contact.setUser(user);

        Contact saved = contactRepository.save(contact);
        return toResponse(saved);
    }

    public List<ContactResponse> getAllByUser(Long userId) {
        userService.findById(userId);
        return contactRepository.findByUserUserId(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    public ContactResponse getById(Long contactId) {
        return toResponse(findById(contactId));
    }

    public ContactResponse update(Long contactId, ContactRequest request) {
        Contact contact = findById(contactId);
        contact.setName(request.name());
        contact.setPhoneNumber(request.phoneNumber());
        contact.setEmail(request.email());
        if (request.favourite() != null) {
            contact.setFavourite(request.favourite());
        }
        Contact updated = contactRepository.save(contact);
        return toResponse(updated);
    }

    public ContactResponse toggleFavourite(Long contactId) {
        Contact contact = findById(contactId);
        boolean current = Boolean.TRUE.equals(contact.getFavourite());
        contact.setFavourite(!current);
        Contact updated = contactRepository.save(contact);
        return toResponse(updated);
    }

    public ContactResponse markFavouriteTrue(Long contactId) {
        Contact contact = findById(contactId);
        contact.setFavourite(Boolean.TRUE);
        Contact updated = contactRepository.save(contact);
        return toResponse(updated);
    }

    public void delete(Long contactId) {
        Contact contact = findById(contactId);
        contactRepository.delete(contact);
    }

    private Contact findById(Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
    }

    private ContactResponse toResponse(Contact contact) {
        return new ContactResponse(
                contact.getId(),
                contact.getName(),
                contact.getPhoneNumber(),
                contact.getFavourite(),
                contact.getEmail(),
                contact.getUser().getUserId()
        );
    }
}
