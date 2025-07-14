package br.edu.ufop.web.ticket.sales.converter;

import br.edu.ufop.web.ticket.sales.domain.Event;
import br.edu.ufop.web.ticket.sales.dto.EventRequest;
import br.edu.ufop.web.ticket.sales.dto.EventResponse;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EventConverter {

    public static Event toDomain(EventRequest request) {
        return Event.builder()
                .description(request.description())
                .type(request.type())
                .date(request.date())
                .startSales(request.startSales())
                .endSales(request.endSales())
                .price(request.price())
                .build();
    }

    public static EventModel toModel(Event domain) {
        return EventModel.builder()
                .id(domain.getId())
                .description(domain.getDescription())
                .type(domain.getType())
                .date(domain.getDate())
                .startSales(domain.getStartSales())
                .endSales(domain.getEndSales())
                .price(domain.getPrice())
                .build();
    }

    public static EventResponse toResponse(EventModel model) {
        return new EventResponse(
                model.getId(),
                model.getDescription(),
                model.getType(),
                model.getDate(),
                model.getStartSales(),
                model.getEndSales(),
                model.getPrice(),
                model.getCreatedAt(),
                model.getUpdatedAt()
        );
    }
}