import * as dotenv from 'dotenv';
dotenv.config();

export const envs = {
    PORT: parseInt(process.env.PORT || '3000'),
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    DB_USER: process.env.DB_USER || 'admin',
    DB_PASSWORD: process.env.DB_PASSWORD || '@chamba26',
    DB_NAME: process.env.DB_NAME || 'mydb',
    JWT_SECRET: process.env.JWT_SECRET || 'una_clave_super_secreta_y_larga_1234567890'
}