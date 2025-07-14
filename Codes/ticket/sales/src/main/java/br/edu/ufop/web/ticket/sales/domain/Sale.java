package br.edu.ufop.web.ticket.sales.domain;

import java.time.LocalDateTime;
import java.util.UUID;

import br.edu.ufop.web.ticket.sales.enums.SaleStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Sale {
    private UUID id;
    private UUID userId;
    private UUID eventId;
    private LocalDateTime purchaseDate;
    private SaleStatus purchaseStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}