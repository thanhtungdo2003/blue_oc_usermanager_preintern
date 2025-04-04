import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
import jwt from 'jsonwebtoken'
import connection from '../config/db.js';
import dotenv from "dotenv";
dotenv.config();


class User {
    /**
     * Lấy thông tin người dùng theo ID
     * @param {string} id - ID người dùng
     * @returns {Promise<Object>} Thông tin người dùng hoặc lỗi
     */
    static getById(id) {
        return new Promise((resolve, reject) => {
            // Kiểm tra ID hợp lệ
            if (!id || id.length === 0) {
                return reject(new Error("ID không hợp lệ"));
            }
            // Truy vấn DB
            connection.query(`
                SELECT 
                    user_id,
                    username,
                    email,
                    user_role,
                    created_at
                FROM user
                WHERE user_id = ?`, [id], (err, result) => {
                if (err) {
                    return reject(new Error("Lỗi khi lấy người dùng: " + err.message));
                }

                if (result.length === 0) {
                    return reject(new Error("Người dùng không tồn tại"));
                }

                resolve(result[0]);
            });
        });
    }
    /**
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns 
     */
    static login(username, password) {
        return new Promise((resolve, reject) => {
            if (!username || !password) {
                return reject(new Error("Vui lòng nhập đầy đủ thông tin đăng nhập"));
            }

            // Truy vấn DB để lấy thông tin user
            connection.query(`
                SELECT 
                    u.user_id,
                    u.username,
                    u.email,
                    u.created_at,
                    r.role_id,
                    r.role_name,
                    u.hasspass -- Lấy mật khẩu hash từ DB
                FROM user u
                LEFT JOIN user_role r ON r.role_id = u.role_id
                WHERE username = ? OR email = ?`, [username, username], (err, result) => {
                if (err) {
                    return reject(new Error("Lỗi khi kiểm tra tài khoản: " + err.message));
                }

                if (result.length === 0) {
                    return reject(new Error("Tên đăng nhập hoặc mật khẩu không đúng"));
                }

                const user = result[0];

                // So sánh mật khẩu nhập vào với mật khẩu hash trong DB
                bcrypt.compare(password, user.hasspass, (err, isMatch) => {
                    if (err) {
                        return reject(new Error("Lỗi khi kiểm tra mật khẩu"));
                    }

                    if (!isMatch) {
                        return reject(new Error("Tên đăng nhập hoặc mật khẩu không đúng"));
                    }

                    const userPayload = {
                        user_id: user.user_id,
                        username: user.username,
                        email: user.email,
                        create_at: user.created_at,
                        role: user.role_name
                    }
                    //mã hóa thông tin người dùng với SECRET_KEY tại file .env
                    const token = jwt.sign(userPayload, process.env.SECRET_KEY, { expiresIn: "6h" });

                    // Trả về thông tin user đã mã hóa
                    resolve(token);
                });
            });
        });
    }
    /**
         * Đăng ký tài khoản mới
         * @param {string} username - Tên đăng nhập
         * @param {string} email - Email
         * @param {string} password - Mật khẩu
         * @returns {Promise<string>} Token JWT nếu đăng ký thành công
    */
    static register(username, email, password) {
        return new Promise((resolve, reject) => {
            if (!username || !email || !password) {
                return reject(new Error("Vui lòng nhập đầy đủ thông tin"));
            }

            // Mã hóa mật khẩu
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(new Error("Lỗi mã hóa mật khẩu"));
                }
                const userId = randomUUID();
                // Gọi stored procedure để đăng ký user
                connection.query(`CALL sp_user_register(?, ?, ?, ?)`, [userId, username, email, hash], (err, result) => {
                    if (err) {
                        return reject(new Error("Lỗi khi tạo tài khoản: " + err.message));
                    }

                    resolve("Đăng ký thành công");
                });
            });
        });
    }

    // lấy danh sách người dùng
    static getAll() {
        return new Promise((resolve, rejects) => {
            connection.query(`
                SELECT
                    u.user_id,
                    u.username, 
                    u.email, 
                    u.created_at, 
                    u.role_id,
                    r.role_name  
                FROM user u
                LEFT JOIN user_role r ON r.role_id = u.role_id
                `, (err, result) => {
                if (err) return rejects(new Error("Lỗi khi lấy danh sách người dùng: " + err));
                resolve(result);
            })
        })
    }
    /**
     * Cập nhật thông tin user
     * @param {number} userId - ID user cần cập nhật
     * @param {string} username - Tên mới
     * @param {string} email - Email mới
     * @param {string|null} password - Mật khẩu mới (nếu có)
     * @returns {Promise<string>} Thông báo thành công hoặc lỗi
     */
    static update(userId, username, email, password) {
        return new Promise((resolve, reject) => {
            if (!userId || !username || !email) {
                return reject(new Error("Vui lòng nhập đầy đủ thông tin"));
            }
            // Nếu không có mật khẩu mới, gọi procedure mà không truyền hash
            if (!password) {
                connection.query(`CALL sp_user_update(?, ?, ?, NULL)`, [userId, username, email], (err, result) => {
                    if (err) return reject(new Error("Lỗi khi cập nhật tài khoản: " + err.message));
                    resolve("Cập nhật thông tin thành công!");
                });
            } else {
                // Nếu có mật khẩu mới, băm mật khẩu trước khi cập nhật
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) return reject(new Error("Lỗi mã hóa mật khẩu"));

                    connection.query(`CALL sp_user_update(?, ?, ?, ?)`, [userId, username, email, hash], (err, result) => {
                        if (err) return reject(new Error("Lỗi khi cập nhật tài khoản: " + err.message));
                        resolve("Cập nhật thông tin & mật khẩu thành công!");
                    });
                });
            }
        });
    }
    //Xóa người dùng
    static delete(id) {
        return new Promise((resolve, rejects) => {
            if (!id) return rejects(new Error("Id không hợp lệ!"));

            connection.query("DELETE FROM 'user' WHERE user_id = ?", [id], (err, result) => {
                if (err) return rejects(new Error("Xóa không thành công: " + err));

                resolve(result);
            })
        })
    }

    //Đặt quyền
    static setRole(id, role) {
        return new Promise((resolve, rejects) => {
            if (!id || !role) return rejects(new Error("Id hoặc quyền không hợp lệ!"));
            connection.query(`
                UPDATE user 
                SET role_id = ?
                WHERE user_id = ?
                `, [role, id], (err, result) => {
                if (err) return rejects(new Error("Cập nhật không thành công: " + err));

                resolve("Cập nhật quyền thành công!");
            })
        })
    }


    static createRole(roleName) {
        return new Promise((resolve, rejects) => {
            if (!roleName) return rejects(new Error("thông tin không hợp lệ!"));
            connection.query(`
                INSERT INTO user_role (role_id, role_name)
                VALUES (?, ?)
                `, [randomUUID(), roleName], (err, result) => {
                if (err) return rejects(new Error("Cập nhật không thành công: " + err));

                resolve("Cập nhật quyền thành công!");
            })
        })
    }

    static roleGetAll() {
        return new Promise((resolve, rejects) => {
            connection.query(`
                SELECT * from user_role
                `, [], (err, result) => {
                if (err) return rejects(new Error("Cập nhật không thành công: " + err));
                resolve(result);
            })
        })
    }
}
export default User;