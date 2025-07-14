package br.edu.ufop.web.ticket.sales.service;

import br.edu.ufop.web.ticket.sales.converter.SaleConverter;
import br.edu.ufop.web.ticket.sales.domain.Sale;
import br.edu.ufop.web.ticket.sales.dto.SaleRequest;
import br.edu.ufop.web.ticket.sales.dto.SaleResponse;
import br.edu.ufop.web.ticket.sales.dto.SaleStatusUpdateRequest;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import br.edu.ufop.web.ticket.sales.model.SaleModel;
import br.edu.ufop.web.ticket.sales.repository.IEventRepository;
import br.edu.ufop.web.ticket.sales.repository.ISaleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final ISaleRepository saleRepository;
    private final IEventRepository eventRepository;

    @Transactional(readOnly = true)
    public List<SaleResponse> findAll() {
        return saleRepository.findAll().stream()
                .map(SaleConverter::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SaleResponse findById(UUID id) {
        return saleRepository.findById(id)
                .map(SaleConverter::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found with id: " + id));
    }

    @Transactional
    public SaleResponse create(SaleRequest request) {
        EventModel event = eventRepository.findById(request.eventId())
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + request.eventId()));

        // Validações de regra de negócio (ex: data de venda, ingressos disponíveis) podem ser adicionadas aqui.

        Sale domain = SaleConverter.toDomain(request);
        SaleModel model = SaleConverter.toModel(domain, event);
        return SaleConverter.toResponse(saleRepository.save(model));
    }
    
    @Transactional
    public SaleResponse updateStatus(UUID id, SaleStatusUpdateRequest request) {
        SaleModel sale = saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found with id: " + id));
        
        // Regras de negócio para alteração de status
        sale.setPurchaseStatus(request.newStatus());

        return SaleConverter.toResponse(saleRepository.save(sale));
    }

    @Transactional
    public void delete(UUID id) {
        SaleModel sale = saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found with id: " + id));

        // Regra de negócio: só pode deletar/cancelar se o status for "PENDING"
        if(sale.getPurchaseStatus() != br.edu.ufop.web.ticket.sales.enums.SaleStatus.PENDING){
            throw new IllegalStateException("Sale cannot be deleted with status: " + sale.getPurchaseStatus());
        }

        saleRepository.deleteById(id);
    }
}