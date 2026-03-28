const app = require('./src/app');

// Inicia o servidor HTTP usando a aplicação configurada em src/app.js.
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
