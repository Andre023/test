package br.edu.ufop.web.ticket.sales.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.edu.ufop.web.ticket.sales.enums.SaleStatus;

public record SaleResponse(
        UUID id,
        UUID userId,
        EventResponse event,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime purchaseDate,
        SaleStatus purchaseStatus,
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime createdAt
) {
}