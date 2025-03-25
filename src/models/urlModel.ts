import { pool } from "../configs/db"

export const UrlModel = {
    async createUrls() {
        const sql = `CREATE TABLE IF NOT EXISTS urls(
                     id VARCHAR(255) UNIQUE NOT NULL,
                     longUrl VARCHAR(255) NOT NULL
                    );`
        const result = await pool.query(sql);
        return result.rows[0];
    },

    async createUrl(id: string, longUrl: string): Promise<string> {
        this.createUrls().then(ans => ans);
        const sql = `INSERT INTO urls (id, longUrl)
                     VALUES ($1, $2)
                     ON CONFLICT (id) DO NOTHING
                     RETURNING id, longURL;`
        const result = await pool.query(sql, [id, longUrl]);
        return result.rows[0].id;
    },

    async idExists(id: string): Promise<boolean> {
        const sql = `SELECT EXISTS (SELECT 1 FROM urls WHERE id = $1);`;
        const result = await pool.query(sql, [id]);
        return result.rows[0].exists;
    },

    async getLongUrl(id: string): Promise<string> {
        const sql = `SELECT * FROM urls WHERE id = $1;`;
        const result = await pool.query(sql, [id]);
        return result.rows[0].longurl;
    },

    async deleteAllUrls() {
        const sql = 'DROP TABLE urls;'
        const result = await pool.query(sql);
        return result;
    }
}