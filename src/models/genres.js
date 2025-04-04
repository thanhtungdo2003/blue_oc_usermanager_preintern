import { randomUUID } from "crypto";
import connection from "../config/db.js";

class Genre {
    /**
     * 
     * @param {string} genreParentId 
     * @param {string} genreName 
     * @returns 
     */
    static create(genreName, genreParentId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                INSERT INTO genre(genre_id, genre_name${genreParentId ? `, genre_parent_id` : ""})
                VALUES (?, ?${genreParentId ? `, ?` : ""})
            `, genreParentId?[randomUUID(), genreName, genreParentId]:[randomUUID(), genreName], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("Create successfully");
            })
        });
    }
    /**
     * 
     * @param {string} userId 
     * @param {string} genreName 
     * @param {string} genreParentId 
     * @returns 
     */
    static update(genreId, genreName, genreParentId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE genre 
                SET genre_name = ?${genreParentId ? `, genre_parent_id = ?` : ""}
                WHERE genre_id = ?
            `, genreParentId?[genreName, genreParentId, genreId]:[genreName, genreId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("Update successfully!");
            })
        });
    }
    /**
     * 
     * @param {string} genreId 
     * @returns 
     */
    static getById(genreId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT 
                    *
                FROM genre
                WHERE genre_id = ? 
            `, [genreId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve(result);
            })
        });
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT 
                    *
                FROM genre
            `, [], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve(result);
            })
        });
    }
    /**
     * 
     * @param {string} genreId 
     * @returns 
     */
    static delete(genreId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                DELETE FROM genre 
                WHERE genre_id = ?
            `, [genreId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("delete successfully!");
            })
        });
    }
}
export default Genre;