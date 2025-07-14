package br.edu.ufop.web.ticket.sales.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EventType {
    LECTURE(1, "Palestra"),
    CONCERT(2, "Show"),
    THEATER(3, "Teatro"),
    COURSE(4, "Curso");

    private final Integer id;
    private final String description;
}