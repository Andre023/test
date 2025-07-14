package br.edu.ufop.web.ticket.sales.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.ufop.web.ticket.sales.model.EventModel;

@Repository
public interface IEventRepository extends JpaRepository<EventModel, UUID> {
}