import { createPool, Pool } from 'mysql2';
import * as dotenv from 'dotenv';

dotenv.config();

const pool: Pool = createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: parseInt(process.env.MYSQL_PORT as string, 10),
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PW,
});

const db = pool.promise();

export default db;
