package br.edu.ufop.web.ticket.sales.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SaleRequest(
        @NotNull UUID userId,
        @NotNull UUID eventId
) {
}