# Microsserviço de Vendas de Ingressos (Sales)

Este projeto foi desenvolvido como parte da Atividade Prática 01 da disciplina **CSI607 - Sistemas Web II**.

O objetivo foi implementar um microsserviço de **Vendas (Sales)** para uma aplicação de gerenciamento de tickets. Este serviço é responsável por cadastrar eventos e processar a venda de ingressos para os usuários.

## Arquitetura

A aplicação segue uma arquitetura de microsserviços, composta pelas seguintes partes:

* **`nameserver` (Eureka):** Responsável pelo registro e descoberta dos outros serviços na rede.
* **`gateway` (Spring Cloud Gateway):** Ponto de entrada único para todas as requisições, roteando o tráfego para os microsserviços apropriados.
* **`users`:** Microsserviço para gerenciamento de usuários.
* **`sales`:** Microsserviço focado na gestão de eventos e vendas, atendendo aos requisitos da atividade.
* **`postgres-users` & `postgres-sales`**: Instâncias do PostgreSQL para persistência dos dados de cada serviço.

## Pré-requisitos

Para executar o projeto, você precisará ter instalado:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Como Executar o Projeto

1.  Clone este repositório.
2.  Navegue até a pasta `Codes/ticket/`.
3.  Execute o seguinte comando no terminal para construir as imagens e iniciar todos os contêineres:

    ```bash
    docker-compose -f docker-compose-dev.yaml up --build
    ```

A aplicação estará totalmente disponível quando todos os serviços forem iniciados.

### Acessando os Serviços

* **API Gateway:** `http://localhost:8080` (ponto de entrada para a API)
* **Eureka Dashboard:** `http://localhost:8761` (para visualizar os serviços registrados)
* **pgAdmin:** `http://localhost:8123` (para gerenciar os bancos de dados)
    * **Login:** `web@ufop.edu.br`
    * **Senha:** `123456`

## Endpoints da API (Microsserviço Sales)

O microsserviço `sales` implementa as operações de CRUD para as entidades `Event` e `Sale`, expondo os seguintes endpoints na porta `4000`.

### Eventos (`/events`)

* `GET /events`: Lista todos os eventos.
* `GET /events/{id}`: Busca um evento por ID.
* `POST /events`: Cria um novo evento.
* `PUT /events/{id}`: Atualiza um evento existente.
* `DELETE /events/{id}`: Remove um evento.

### Vendas (`/sales`)

* `GET /sales`: Lista todas as vendas.
* `POST /sales`: Cria uma nova venda (compra de ingresso).
* `PATCH /sales/{id}/status`: Atualiza o status de uma venda (ex: para `PAID`).
* `DELETE /sales/{id}`: Remove uma venda.

Para uma documentação detalhada e exemplos de requisições, consulte o arquivo [endpoints.md](Codes/ticket/sales/endpoints.md) ou utilize o arquivo [sales.rest](Codes/ticket/sales/sales.rest) com a extensão REST Client no VS Code.
