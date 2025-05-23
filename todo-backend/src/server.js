const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: ["http://localhost", "http://3.147.64.15/",]
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

// Função para iniciar o servidor
const startServer = async () => {
  await connectDB();
  return app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

// Exportando para testes
module.exports = { app, startServer };

// Iniciar o servidor apenas se este arquivo for executado diretamente
if (require.main === module) {
  startServer();
}