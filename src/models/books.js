import { randomUUID } from "crypto";
import connection from "../config/db.js";
import { resolve } from "path";
import { rejects } from "assert";
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
     * @param {string} authorId 
     * @param {string} title 
     * @returns 
     */
    static create(genreId, authorId, title) {
        return new Promise((resolve, reject) => {
            connection.query(`
                INSERT INTO book(book_id, genre_id, author_id, title, publish_year)
                VALUES (?, ?, ?, ?, ?)
            `, [randomUUID(), genreId, authorId, title, (new Date().getFullYear())], (err, result) => {
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
                SET genre_id = ?, author_id = ?, title = ?, publish_year = ?
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
                JOIN author a ON b.author_id = a.author_id
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
                JOIN author a ON b.author_id = a.author_id
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

    static borrowCreate(userId, booksBorrowings) {
        return new Promise((resolve, reject) => {
            const newId = randomUUID();

            const values = booksBorrowings.map(book => `('${newId}', '${book.bookId}')`).join(", ");

            const sql1 = `INSERT INTO borrowingHistory (borrowing_id, user_id) VALUES ('${newId}', '${userId}');`;
            const sql2 = `INSERT INTO borrowingDetail (borrowing_id, book_id) VALUES ${values};`;

            connection.query(sql1, (err1) => {
                if (err1) return reject(err1);

                connection.query(sql2, (err2) => {
                    if (err2) return reject(err2);
                    resolve({ message: "Thêm thông tin mượn sách thành công", borrowingId: newId });
                });
            });
        });
    }

    static getTopBorrowedBooks(months = 5, limit = 20) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS top,
                    bd.book_id,
                    COUNT(*) AS total_borrowed
                FROM borrowingDetail bd
                JOIN borrowingHistory bh ON bd.borrowing_id = bh.borrowing_id
                WHERE bh.created_at >= DATE_SUB(NOW(), INTERVAL ? MONTH)
                GROUP BY bd.book_id
                ORDER BY total_borrowed DESC
                LIMIT ?;
            `;
    
            connection.query(sql, [months, limit], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
    
}
export default Book;