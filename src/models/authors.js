import connection from "../config/db.js";

class Author {
    /**
     * 
     * @param {string} userId 
     * @param {string} authorName 
     * @returns 
     */
    static create(userId, authorName) {
        return new Promise((resolve, reject) => {
            connection.query(`
                INSERT INTO author(user_id, author_name, contribution_points)
                VALUES (?, ?, ?)
            `, [userId, authorName, 0], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("Create successfully");
            })
        });
    }
    /**
     * 
     * @param {string} userId 
     * @param {string} authorName 
     * @param {int} contributionPoints 
     * @returns 
     */
    static update(userId, authorName, contributionPoints) {
        return new Promise((resolve, reject) => {
            connection.query(`
                UPDATE author 
                SET author_name = ?, contribution_points = ?
                WHERE user_id = ?
            `, [authorName, contributionPoints, userId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("Update successfully!");
            })
        });
    }
    /**
     * 
     * @param {string} userId 
     * @returns 
     */
    static getById(userId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT 
                    a.*,
                    u.email,
                    u.username
                FROM author a
                INNER JOIN user u ON u.user_id = a.user_id
                WHERE a.user_id = ? 
            `, [userId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve(result);
            })
        });
    }
    static getAll() {
        return new Promise((resolve, reject) => {
            connection.query(`
                SELECT 
                    a.*,
                    u.email,
                    u.username
                FROM author a
                INNER JOIN user u ON u.user_id = a.user_id
            `, [], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve(result);
            })
        });
    }
    /**
     * 
     * @param {string} userId 
     * @returns 
     */
    static delete(userId) {
        return new Promise((resolve, reject) => {
            connection.query(`
                DELETE FROM author 
                WHERE user_id = ?
            `, [userId], (err, result) => {
                if (err) return reject(new Error("Error: " + err.message));
                resolve("delete successfully!");
            })
        });
    }
}
export default Author;