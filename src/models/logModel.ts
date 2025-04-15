import { pool } from "../configs/db";
import { Log, LogInput } from "../types/Log";


export const LogModel = {
    async createLogs() {
        const sql = `CREATE TABLE IF NOT EXISTS logs(
                        log_id SERIAL PRIMARY KEY,
                        url_id VARCHAR(255) REFERENCES urls(id),
                        device VARCHAR(255),
                        os VARCHAR(255),
                        country VARCHAR(255),
                        city VARCHAR(255),
                        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );`;
        const result = await pool.query(sql);
        return result;
    },

    async createLog(log: LogInput): Promise<Log> {
        const { url_id, device, os, country, city } = log;
        this.createLogs().then(ans => ans);
        const sql = `INSERT INTO logs (url_id, device, os, country, city)
                     VALUES ($1, $2, $3, $4, $5)
                     RETURNING log_id, url_id, device, os, country, city, date;`;
        const result = await pool.query(sql, [url_id, device, os, country, city])
        return result.rows[0];
    },

    async totRequests(url_id: string): Promise<number> {
        const sql = `SELECT * FROM logs WHERE url_id = $1;`;
        const result = await pool.query(sql, [url_id]);
        return !result.rows[0] ? 0 : result.rows.map(row => row).length;
    },

    async totRequestsSpecific(url_id: string, column: string, unique: string): Promise<number> {
        const sql = `SELECT * FROM logs
                     WHERE url_id = $1
                     AND ${column} = $2;`;
        const result = await pool.query(sql, [url_id, unique]);
        return !result.rows[0] ? 0 : result.rows.map(row => row['url_id']).length;
    },

    async findUnique(url_id: string, column: string): Promise<Array<string | unknown>> {
        const sql = `SELECT DISTINCT ${column} FROM logs WHERE url_id = $1`;
        const result = await pool.query(sql, [url_id]);
        const final = result.rows.map(row => row[column]);
        return final;
    },

    //returns a column with only entries from a specific url_id
    async findColumn(url_id: string, column: string): Promise<Array<string | unknown>> {
        const sql = `SELECT ${column} FROM logs WHERE url_id = $1`;
        const result = await pool.query(sql, [url_id]);
        const final = result.rows.map(row => row[column]);
        return final;
    },

    async deleteAllLogs() {
        const sql = 'DROP TABLE logs;'
        const result = await pool.query(sql);
        return result;
    }
}