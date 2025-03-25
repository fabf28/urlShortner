import { Pool } from "pg"

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'urlShortnerDB',
    password: 'postgres',
    port: 5432
});

