# Aplicação Todo List

## Sobre o Projeto

Este é um projeto completo de uma aplicação de lista de tarefas (Todo List) com frontend em React e backend em Node.js. A aplicação permite criar, visualizar, editar e excluir tarefas, além de marcar tarefas como concluídas.

## Estrutura do Projeto

```
todo-Desafio/
├── config/
│   └── nginx/
├── todo-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── models/
│   └── tests/
├── todo-frontend/
│   ├── public/
│   └── src/
└── docker-compose.yml
```

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB
- Jest (para testes)

### Frontend
- React
- Material UI
- Axios

### Infraestrutura
- Docker
- Docker Compose
- Nginx (para proxy reverso)

## Como Executar

### Pré-requisitos
- Docker
- Docker Compose

### Passos para Execução

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd todo-Desafio
   ```

2. Inicie os contêineres com Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Acesse a aplicação:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Funcionalidades

- Criar novas tarefas com título e descrição
- Visualizar lista de todas as tarefas
- Filtrar tarefas por status (todas, ativas, concluídas)
- Editar tarefas existentes
- Marcar tarefas como concluídas
- Excluir tarefas

## Estrutura Detalhada

### Backend (todo-backend)

API RESTful para gerenciamento de tarefas com endpoints para criar, listar, atualizar e excluir tarefas. Para mais detalhes, consulte o [README do backend](./todo-backend/README.md).

### Frontend (todo-frontend)

Interface de usuário construída com React e Material UI, oferecendo uma experiência moderna e responsiva para gerenciar suas tarefas. Para mais detalhes, consulte o [README do frontend](./todo-frontend/README.md).

## Desenvolvimento

Para desenvolvimento local sem Docker:

### Backend
```bash
cd todo-backend
npm install
npm run dev
```

### Frontend
```bash
cd todo-frontend
npm install
npm start
```

## Testes

### Backend
```bash
cd todo-backend
npm test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.