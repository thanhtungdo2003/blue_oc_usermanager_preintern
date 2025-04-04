import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  connectTimeout: 10000
});

export default connection;