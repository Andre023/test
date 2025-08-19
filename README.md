# Sistema de Vendas de Ingressos  

Este projeto full-stack foi desenvolvido para a disciplina **CSI607 - Sistemas Web II**.  

O sistema consiste em uma aplicação de gerenciamento de tickets com uma arquitetura de **microsserviços** no backend e uma **interface de administração moderna** no frontend para gerenciar eventos, usuários e vendas.  

---

## 🏗️ Arquitetura e Tecnologias  

A aplicação segue uma arquitetura de microsserviços robusta, utilizando as seguintes tecnologias:  

- **Backend:** Java 17, Spring Boot, Spring Cloud (Gateway, Eureka), Spring Data JPA  
- **Frontend:** React, TypeScript, Vite, Axios, React Router  
- **Banco de Dados:** PostgreSQL  
- **Orquestração:** Docker e Docker Compose  

---

## 🚀 Como Executar o Projeto Completo  

Para rodar a aplicação, você precisa ter **Docker** e **Node.js** instalados.  

### 1. Iniciar o Backend  

O backend (todos os microsserviços e bancos de dados) é orquestrado pelo **Docker Compose**.  

```bash
# 1. Navegue até a pasta principal do backend
cd Codes/ticket/

# 2. Construa as imagens e inicie os contêineres
docker-compose -f docker-compose-dev.yaml up --build
```

### 2. Iniciar o Frontend  

Em um novo terminal, inicie a interface de administração.  

```bash
# 1. Navegue até a pasta do frontend
cd Codes/ticket/ticket-admin-ui/

# 2. Instale as dependências (apenas na primeira vez)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

---

## 🌐 Acessando os Serviços  

- **Interface Web:** [http://localhost:5173](http://localhost:5173)  
- **API Gateway:** [http://localhost:8080](http://localhost:8080) (ponto de entrada para a API)  
- **Eureka Dashboard:** [http://localhost:8761](http://localhost:8761) (visualização dos serviços registrados)  
- **pgAdmin:** [http://localhost:8123](http://localhost:8123) (gerenciamento dos bancos de dados)  

---

## 🔑 Credenciais de Acesso  

- **Login:** `web@ufop.edu.br`  
- **Senha:** `123456`  
