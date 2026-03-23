package com.example.backend.service;

import com.example.backend.dto.ContactRequest;
import com.example.backend.dto.ContactResponse;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.Contact;
import com.example.backend.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactResponse create(ContactRequest request) {
        Contact contact = new Contact();
        contact.setName(request.name());
        contact.setPhone(request.phone());
        contact.setEmail(request.email());
        contact.setCompany(request.company());
        contact.setCity(request.city());

        Contact saved = contactRepository.save(contact);
        return toResponse(saved);
    }

    public List<ContactResponse> getAll() {
        return contactRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public ContactResponse getById(Long contactId) {
        return toResponse(findById(contactId));
    }

    public ContactResponse update(Long contactId, ContactRequest request) {
        Contact contact = findById(contactId);
        contact.setName(request.name());
        contact.setPhone(request.phone());
        contact.setEmail(request.email());
        contact.setCompany(request.company());
        contact.setCity(request.city());
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
                contact.getPhone(),
                contact.getEmail(),
                contact.getCompany(),
                contact.getCity()
        );
    }
}
