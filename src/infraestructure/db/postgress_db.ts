import { Pool } from "pg";

export const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "mydb",
  password: "@chamba26",
  port: 5432
})

async function initDb() {
  await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );

    INSERT INTO categories (id, name) VALUES
      (gen_random_uuid(), 'torta'),
      (gen_random_uuid(), 'torta_personalizada'),
      (gen_random_uuid(), 'tarta'),
      (gen_random_uuid(), 'postres'),
      (gen_random_uuid(), 'budines'),
      (gen_random_uuid(), 'confiteria'),
      (gen_random_uuid(), 'mesa_dulce'),
      (gen_random_uuid(), 'otros')
      ON CONFLICT (name) DO NOTHING;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL,
      category_id UUID NOT NULL REFERENCES categories(id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_status (
      id UUID PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );

    INSERT INTO order_status (id, name) VALUES
      (gen_random_uuid(), 'pendiente'),
      (gen_random_uuid(), 'pagada'),
      (gen_random_uuid(), 'entregada')
      ON CONFLICT (name) DO NOTHING;`
    );

  await pool.query(`
    CREATE TABLE IF NOT EXISTS payments_methods (
      id UUID PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );

    INSERT INTO payments_methods (id, name) VALUES
      (gen_random_uuid(), 'transferencia_bancaria'),
      (gen_random_uuid(), 'efectivo'),
      (gen_random_uuid(), 'tarjeta'),
      (gen_random_uuid(), 'mercado_pago')
      ON CONFLICT (name) DO NOTHING;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id UUID PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      total_price NUMERIC(10, 2) NOT NULL, 
      status_id UUID NOT NULL REFERENCES order_status(id),
      created_at TIMESTAMP NOT NULL DEFAULT now(),
      payment_method_id UUID NOT NULL REFERENCES payments_methods(id)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id UUID PRIMARY KEY,
      order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id UUID NOT NULL REFERENCES products(id),
      quantity INT NOT NULL CHECK (quantity > 0),
      price NUMERIC(10, 2) NOT NULL
    );
  `);

  console.log("✅ Tablas creadas o ya existente");
}

initDb().catch(err => console.error("❌ Error creando tabla:", err));