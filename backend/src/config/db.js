import 'dotenv/config';
import mysql from 'mysql2';

// Cria um pool de conexões para reutilizar acessos ao banco MySQL.
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export default db;
