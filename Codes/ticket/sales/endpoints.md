# Endpoints do Microsserviço de Vendas (Sales)

Este arquivo documenta os endpoints disponíveis no microsserviço de Vendas.

**Porta Padrão:** `4000`

---

## Eventos (`/events`)

### `GET /events`
- **Descrição:** Retorna uma lista de todos os eventos cadastrados.
- **Resposta:** `200 OK`

### `GET /events/{id}`
- **Descrição:** Busca um evento específico pelo seu UUID.
- **Resposta:** `200 OK` ou `404 Not Found`

### `POST /events`
- **Descrição:** Cria um novo evento.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "description": "Show da Banda XYZ",
    "type": "CONCERT",
    "date": "2025-12-25T20:00:00",
    "startSales": "2025-10-01T10:00:00",
    "endSales": "2025-12-24T18:00:00",
    "price": 150.75
  }
  ```
- **Resposta:** `201 Created`

### `PUT /events/{id}`
- **Descrição:** Atualiza um evento existente.
- **Corpo da Requisição:** Mesmo do `POST`.
- **Resposta:** `200 OK` ou `404 Not Found`

### `DELETE /events/{id}`
- **Descrição:** Exclui um evento.
- **Resposta:** `204 No Content` ou `404 Not Found`

---

## Vendas (`/sales`)

### `GET /sales`
- **Descrição:** Retorna uma lista de todas as vendas.
- **Resposta:** `200 OK`

### `GET /sales/{id}`
- **Descrição:** Busca uma venda específica pelo seu UUID.
- **Resposta:** `200 OK` ou `404 Not Found`

### `POST /sales`
- **Descrição:** Cria uma nova venda (compra de ingresso). A venda é criada com o status "PENDING".
- **Corpo da Requisição (JSON):**
  ```json
  {
    "userId": "uuid-do-usuario-aqui",
    "eventId": "uuid-do-evento-aqui"
  }
  ```
- **Resposta:** `201 Created`

### `PATCH /sales/{id}/status`
- **Descrição:** Atualiza o status de uma venda existente.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "newStatus": "PAID"
  }
  ```
- **Resposta:** `200 OK` ou `404 Not Found`

### `DELETE /sales/{id}`
- **Descrição:** Deleta uma venda. Por regra de negócio, só é possível deletar se o status for "PENDING".
- **Resposta:** `204 No Content` ou `404 Not Found`