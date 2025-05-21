const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Exportando para testes
module.exports = { app };
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost"]
}));


app.use(express.json());

app.use(morgan('dev'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Erro interno do servidor'
  });
});

const todoRoutes = require('./routes/todoRoutes');
app.use(todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Tarefas funcionando!' });
});

// Conectar ao MongoDB e iniciar o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});