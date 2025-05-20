const express = require('express');
const app = express();

// Importar rotas
const todoRoutes = require('./routes/todoRoutes');

// Middleware para analisar o corpo das requisições
app.use(express.json());

// Usar rotas
app.use(todoRoutes);

// Exportar o aplicativo
module.exports = app;