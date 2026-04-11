import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'Admin',
    password: 'Admin2026@General',
    database: 'db_matir',
    waitForConnections: true,
    connectionLimit: 10,   // número máximo de conexiones simultáneas
    queueLimit: 0          // sin límite de cola
});

export async function testDB() {
    const [rows] = await connection.query('SELECT NOW() AS fecha');
    console.log(rows);

}

export async function initDb() {
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id CHAR(36) PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20)
    )
  `);

    console.log("Tabla users creada o ya existente");
}