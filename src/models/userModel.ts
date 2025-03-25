import { pool } from "../configs/db";
import { User } from "../types/User";

export const UserModel = {

    //Create user table
    async createUsers() {
        // Use parameterized queries to prevent SQL injection
        const sql = `CREATE TABLE IF NOT EXISTS users(
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(255) UNIQUE NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        isAdmin BOOLEAN DEFAULT FALSE NOT NULL
                    );`;
        const result = await pool.query(sql);
        return result; // IDK

    },

    // Creating a new user
    async createUser(username: string, password: string): Promise<User> {
        // Use parameterized queries to prevent SQL injection
        this.createUsers().then(ans => ans);
        const sql = `INSERT INTO users (username, password)
                     VALUES ($1, $2)
                     ON CONFLICT (username) DO NOTHING
                     RETURNING id, username, password, isAdmin;`;

        const result = await pool.query(sql, [username, password]);
        return result.rows[0]; // Return the user object
    },

    //Get user by password
    async getUser(username: string): Promise<User> {
        const sql = `SELECT * FROM users WHERE username = $1`;

        const result = await pool.query(sql, [username]);
        return result.rows[0]; // Return the user object
    },

    //Check if user exists
    async userExists(username: string): Promise<boolean> {
        const sql = `SELECT EXISTS (SELECT 1 FROM users WHERE username = $1);`
        const result = await pool.query(sql, [username]);
        return result.rows[0].exists;
    },

    // Updating a user to be an admin
    async turnIntoAdmin(username: string): Promise<boolean> {
        const sql = `UPDATE users SET isAdmin = true WHERE username = $1 RETURNING isAdmin;`;

        const result = await pool.query(sql, [username]);
        return result.rows[0].isAdmin; // Return the updated isAdmin status
    },


    //Deleting all users
    async deleteAllUsers() {
        const sql = 'DROP TABLE users;'
        const result = await pool.query(sql);
        return result;
    }
};
