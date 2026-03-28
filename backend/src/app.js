const express = require('express');
const cors = require('cors');

const app = express();

// Libera requisições de outros domínios, como o frontend rodando separado.
app.use(cors());

// Faz o Express entender JSON enviado no corpo das requisições.
app.use(express.json());

const productRoutes = require('./routes/productRoutes');

// Todas as rotas desse arquivo passam a começar com /api.
app.use('/api', productRoutes);

module.exports = app;
