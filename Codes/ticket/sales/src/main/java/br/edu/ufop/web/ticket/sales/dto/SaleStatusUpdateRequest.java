package br.edu.ufop.web.ticket.sales.dto;

import br.edu.ufop.web.ticket.sales.enums.SaleStatus;
import jakarta.validation.constraints.NotNull;

public record SaleStatusUpdateRequest(
        @NotNull SaleStatus newStatus
) {
}