import app from './src/app.js';

// Inicia o servidor HTTP usando a aplicação configurada em src/app.js.
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
