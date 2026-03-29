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

exports.createProduct = (req, res) => {
  const { name, description, brand, price, image } = req.body;

  // Garante que os campos minimos para cadastro foram enviados.
  if (!name || price == null || !image) {
    return res.status(400).json({ error: 'Campos obrigatorios ausentes.' });
  }

  const numericPrice = Number(price);

  // Evita salvar preco invalido ou negativo no banco.
  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: 'O campo price deve ser um numero valido.' });
  }

  // Insere um novo produto usando placeholders para proteger a query.
  const sqlQuery = `
    INSERT INTO products (name, description, brand, price, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    description ?? null,
    brand ?? null,
    numericPrice,
    image
  ];

  db.query(sqlQuery, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Retorna o produto criado com o id gerado pelo banco.
    res.status(201).json({
      message: 'Produto criado com sucesso.',
      product: {
        id: result.insertId,
        name,
        description: description ?? null,
        brand: brand ?? null,
        price: numericPrice,
        image
      }
    });
  });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;

  // Busca um unico produto pelo id recebido na URL.
  const sqlQuery = "SELECT * FROM products WHERE id = ?";

  db.query(sqlQuery, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Quando nao existe registro com esse id, responde com 404.
    if (result.length === 0) {
      return res.status(404).json({ error: 'Produto nao encontrado.' });
    }

    res.json(result[0]);
  });
};


exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, brand, price, image } = req.body;

  // Exige os mesmos campos essenciais usados no cadastro.
  if (!name || price == null || !image) {
    return res.status(400).json({ error: 'Campos obrigatorios ausentes.' });
  }

  const numericPrice = Number(price);

  // Impede atualizacao com preco invalido.
  if (Number.isNaN(numericPrice) || numericPrice < 0) {
    return res.status(400).json({ error: 'O campo price deve ser um numero valido.' });
  }

  // Atualiza os dados do produto correspondente ao id informado.
  const sqlQuery = `
    UPDATE products
    SET name = ?, description = ?, brand = ?, price = ?, image = ?
    WHERE id = ?
  `;

  const values = [
    name,
    description ?? null,
    brand ?? null,
    numericPrice,
    image,
    id
  ];

  db.query(sqlQuery, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Se nenhuma linha foi afetada, o produto nao existe no banco.
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto nao encontrado.' });
    }

    res.json({
      message: 'Produto atualizado com sucesso.',
      product: {
        id: Number(id),
        name,
        description: description ?? null,
        brand: brand ?? null,
        price: numericPrice,
        image
      }
    });
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  // Remove o produto pelo id enviado na URL.
  const sqlQuery = "DELETE FROM products WHERE id = ?";

  db.query(sqlQuery, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // Informa quando o id nao corresponde a nenhum registro.
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto nao encontrado.' });
    }

    res.json({ message: 'Produto removido com sucesso.' });
  });
};
