import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';
import connection from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();
export const authMiddleware = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized - No token provided" });
    let rawToken = authHeader.split(" ");
    if (rawToken.length <= 1) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    let token = rawToken[1]; // Bearer token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) res.status(403).json({ message: "Forbidden - Invalid token" });
            req.userDecode = payload; // Lưu thông tin user vào request
            next(); // Cho phép request tiếp tục
        }); // Xác thực token
    } catch (error) {
        return res.status(403).json({ message: "Forbidden - Invalid token" });
    }
};

export const checkUserUnique = (req, res, next) => {
    const { username, email } = req.body;

    // Truy vấn cơ sở dữ liệu để kiểm tra email hoặc username đã tồn tại chưa
    connection.query(
        `SELECT * FROM user WHERE username = ? OR email = ?`,
        [username, email],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Lỗi khi truy vấn cơ sở dữ liệu" });
            }

            if (result.length > 0) {
                // Kiểm tra nếu email hoặc username đã tồn tại
                const existingUser = result[0];
                return res.status(400).json({
                    error: existingUser.email === email ? "Email đã tồn tại!" : "Người dùng đã tồn tại!"
                });
            }

            // Tiếp tục thực hiện các bước tiếp theo nếu không có lỗi
            next();
        }
    );
};
export const authorizeEdit = (req, res, next) => {
    const userIdFromToken = req.userDecode.user_id; // Lấy ID từ token
    const userIdFromParams = req.params.id; // ID của user cần sửa
    if (req.userDecode.role === 'admin' || userIdFromToken === userIdFromParams) {
        return next(); // Cho phép tiếp tục nếu là admin hoặc chủ tài khoản
    }
    return res.status(403).json({ message: "Not permission" });
}

export const isAdmin = (req, res, next) => {
    if (!req.userDecode) return res.status(400).json({ message: "Không thể xác thực quyền hạn" });
    if (req.userDecode.role === "admin") {
        return next();
    }
    return res.status(403).json({ message: "Not permission" });
}


// Middleware kiểm tra lỗi validation
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};