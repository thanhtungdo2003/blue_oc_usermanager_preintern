import connection from "../config/db.js";

class Author {
    /**
     * 
     * @param {string} authorId 
     * @param {string} authorName 
     * @returns 
     */
    static create(authorId, authorName) {
        return new Promise((resolve, reject) => {
            connection.query(`
                INSERT INTO author(author_id, author_name, contribution_points)
                VALUES (?, ?, ?)
            `, [authorId, authorName, 0], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("Create successfully");
            })
        });
    }
    /**
     * 
     * @param {string} authorId 
     * @param {string} authorName 
     * @param {int} contributionPoints 
     * @returns 
     */
    static update(authorId, authorName, contributionPoints) {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE author 
                SET author_name = ?, contribution_points = ?
                WHERE author_id = ?
            `, [authorName, contributionPoints, authorId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("Update successfully!");
            })
        });
    }
    /**
     * 
     * @param {string} authorId 
     * @returns 
     */
    static getById(authorId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT 
                    *
                FROM author
                WHERE author_id = ? 
            `, [authorId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve(result);
            })
        });
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT 
                    a.*
                FROM author a
            `, [], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve(result);
            })
        });
    }
    /**
     * 
     * @param {string} authorId 
     * @returns 
     */
    static delete(authorId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                DELETE FROM author 
                WHERE author_id = ?
            `, [authorId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("delete successfully!");
            })
        });
    }
}
export default Author;