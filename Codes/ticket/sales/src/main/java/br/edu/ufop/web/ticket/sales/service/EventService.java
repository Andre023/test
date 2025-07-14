package br.edu.ufop.web.ticket.sales.service;

import br.edu.ufop.web.ticket.sales.converter.EventConverter;
import br.edu.ufop.web.ticket.sales.domain.Event;
import br.edu.ufop.web.ticket.sales.dto.EventRequest;
import br.edu.ufop.web.ticket.sales.dto.EventResponse;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import br.edu.ufop.web.ticket.sales.repository.IEventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final IEventRepository repository;

    public List<EventResponse> findAll() {
        return repository.findAll().stream()
                .map(EventConverter::toResponse)
                .collect(Collectors.toList());
    }

    public EventResponse findById(UUID id) {
        return repository.findById(id)
                .map(EventConverter::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));
    }

    public EventResponse create(EventRequest request) {
        Event domain = EventConverter.toDomain(request);
        // Aqui podem ser adicionadas regras de negócio (UseCases)
        EventModel model = EventConverter.toModel(domain);
        return EventConverter.toResponse(repository.save(model));
    }

    public EventResponse update(UUID id, EventRequest request) {
        // Valida se o evento existe antes de atualizar
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Event not found with id: " + id);
        }
        Event domain = EventConverter.toDomain(request);
        domain.setId(id); // Garante que o ID seja o mesmo
        EventModel model = EventConverter.toModel(domain);
        return EventConverter.toResponse(repository.save(model));
    }

    public void delete(UUID id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Event not found with id: " + id);
        }
        repository.deleteById(id);
    }
}
