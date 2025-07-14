package br.edu.ufop.web.ticket.sales.converter;

import br.edu.ufop.web.ticket.sales.domain.Sale;
import br.edu.ufop.web.ticket.sales.dto.SaleRequest;
import br.edu.ufop.web.ticket.sales.dto.SaleResponse;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import br.edu.ufop.web.ticket.sales.model.SaleModel;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import static br.edu.ufop.web.ticket.sales.enums.SaleStatus.PENDING;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SaleConverter {

    public static Sale toDomain(SaleRequest request) {
        return Sale.builder()
                .userId(request.userId())
                .eventId(request.eventId())
                .purchaseDate(LocalDateTime.now())
                .purchaseStatus(PENDING) // Nova venda sempre começa "Em Aberto"
                .build();
    }

    public static SaleModel toModel(Sale domain, EventModel eventModel) {
        return SaleModel.builder()
                .id(domain.getId())
                .userId(domain.getUserId())
                .event(eventModel)
                .purchaseDate(domain.getPurchaseDate())
                .purchaseStatus(domain.getPurchaseStatus())
                .build();
    }

    public static SaleResponse toResponse(SaleModel model) {
        return new SaleResponse(
                model.getId(),
                model.getUserId(),
                EventConverter.toResponse(model.getEvent()),
                model.getPurchaseDate(),
                model.getPurchaseStatus(),
                model.getCreatedAt()
        );
    }
}