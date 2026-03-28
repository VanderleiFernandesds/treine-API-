const db = require('../config/db');

exports.getProducts = (req, res) => {
  // Consulta todos os produtos cadastrados na tabela products.
  const sqlQuery = "SELECT * FROM products";

  db.query(sqlQuery, (err, result) => {
    // Se o banco falhar, responde com erro interno da API.
    if (err) return res.status(500).json({ error: err.message });

    // Envia a lista retornada pelo banco para o frontend.
    res.send(result);
  });
};
