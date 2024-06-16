import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const poolPromise = pool.promise();

const connectDB = async () => {
  try {
    const connection = await poolPromise.getConnection();
    console.log("Database connected!");
    connection.release();

    await poolPromise.query(`
        CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone BIGINT(10) UNSIGNED NOT NULL,
        role ENUM('Teacher', 'Student','Institute') NOT NULL,
        password VARCHAR(255) NOT NULL
      )`);

    await poolPromise.query(`
      CREATE TABLE IF NOT EXISTS polls (
        id VARCHAR(36) PRIMARY KEY,
        question VARCHAR(255) NOT NULL,
        targetRole ENUM('Teacher', 'Student') NOT NULL,
        createdBy VARCHAR(36) NOT NULL,
        FOREIGN KEY (createdBy) REFERENCES users(id)
      )`);

    console.log("Database initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  }
};

export default poolPromise;

export { connectDB };
