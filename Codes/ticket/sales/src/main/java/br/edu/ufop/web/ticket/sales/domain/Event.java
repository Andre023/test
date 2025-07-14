package br.edu.ufop.web.ticket.sales.domain;

import java.time.LocalDateTime;
import java.util.UUID;

import br.edu.ufop.web.ticket.sales.enums.EventType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Event {
    private UUID id;
    private String description;
    private EventType type;
    private LocalDateTime date;
    private LocalDateTime startSales;
    private LocalDateTime endSales;
    private Float price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}