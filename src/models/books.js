import { randomUUID } from "crypto";
import connection from "../config/db.js";
/**
 * DAL quản lý sách
 * cho phép thêm, sửa, xóa, tìm kiếm
 * Và quản lý mượn sách
 * 
 */
class Book {
    /**
     * 
     * @param {string} genreId 
     * @param {string} userId 
     * @param {string} title 
     * @returns 
     */
    static create(genreId, userId, title) {
        return new Promise((resolve, reject) => {
            connection.query(`
                INSERT INTO book(book_id, genre_id, user_id, title, publish_year)
                VALUES (?, ?, ?, ?, ?)
            `, [randomUUID(), genreId, userId, title, (new Date().getFullYear())], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("Create successfully");
            })
        });
    }
    /**
     * 
     * @param {string} bookId 
     * @param {string} genreId 
     * @param {string} userId 
     * @param {string} title 
     * @param {int} publishYear 
     * @returns 
     */
    static update(bookId, genreId, userId, title, publishYear) {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE boook 
                SET genre_id = ?, user_id = ?, title = ?, publish_year = ?
                WHERE book_id = ?
            `, [genreId, userId, title, publishYear, bookId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("Update successfully!");
            })
        });
    }
    /**
     * 
     * @param {string} bookId 
     * @returns 
     */
    static getById(bookId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT 
                    b.*,
                    a.*,
                    g.*
                FROM book b
                JOIN author a ON b.user_id = a.user_id
                JOIN genre g ON b.genre_id = g.genre_id
                WHERE book_id = ? 
            `, [bookId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve(result);
            })
        });
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT 
                    b.*,
                    a.*,
                    g.*
                FROM book b
                JOIN author a ON b.user_id = a.user_id
                JOIN genre g ON b.genre_id = g.genre_id
            `, [], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve(result);
            })
        });
    }
    /**
     * 
     * @param {string} bookId 
     * @returns 
     */
    static delete(bookId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                DELETE FROM book 
                WHERE book_id = ?
            `, [bookId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("delete successfully!");
            })
        });
    }

    

}
export default Book;