import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',       // Substitua pelo seu usuário do PostgreSQL
  host: 'localhost',        // Substitua pelo host do seu banco de dados (pode ser um endereço IP)
  database: 'focos',   // O nome do seu banco de dados
  password: "123",   // Substitua pela sua senha do PostgreSQL
  port: 5432,               // Porta padrão do PostgreSQL
});

export default pool;