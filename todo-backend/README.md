# API de Tarefas (Todo Backend)

Esta é uma API RESTful para gerenciamento de tarefas (todo list) desenvolvida com Node.js e Express.

## Funcionalidades

- Criar tarefas
- Listar todas as tarefas
- Buscar tarefa por ID
- Atualizar tarefas
- Excluir tarefas

## Tecnologias Utilizadas

- Node.js
- Express.js
- Cors (para permitir requisições de diferentes origens)
- Morgan (para logging de requisições HTTP)
- Dotenv (para gerenciamento de variáveis de ambiente)

## Instalação

1. Clone o repositório:
   ```
   git clone [url-do-repositorio]
   cd todo-backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env` (se necessário)
   - Ajuste as configurações conforme necessário

## Executando a API

### Modo de desenvolvimento

```
npm run dev
```

### Modo de produção

```
npm start
```

A API estará disponível em `http://localhost:3000`

## Endpoints

### Tarefas (Todos)

| Método | Endpoint | Descrição |
|--------|----------|------------|
| GET | /api/tasks | Listar todas as tarefas |
| POST | /api/tasks | Criar uma nova tarefa |
| GET | /api/tasks/:id | Buscar tarefa por ID |
| PUT | /api/tasks/:id | Atualizar uma tarefa |
| DELETE | /api/tasks/:id | Excluir uma tarefa |

## Exemplos de Requisições

### Criar uma tarefa

```
POST /api/tasks
Content-Type: application/json

{
  "title": "Estudar Node.js",
  "description": "Aprender sobre Express e APIs RESTful",
  "completed": false
}
```

### Atualizar uma tarefa

```
PUT /api/tasks/1
Content-Type: application/json

{
  "completed": true
}
```

## Estrutura do Projeto

```
todo-backend/
├── src/
│   ├── controllers/
│   │   └── todoController.js
│   ├── routes/
│   │   └── todoRoutes.js
│   └── server.js
├── .env
├── package.json
└── README.md
```