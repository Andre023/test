package br.edu.ufop.web.ticket.sales.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SaleStatus {
    PENDING(1, "Em aberto"),
    PAID(2, "Pago"),
    CANCELED(3, "Cancelado"),
    REFUNDED(4, "Estornado");

    private final Integer id;
    private final String description;
}