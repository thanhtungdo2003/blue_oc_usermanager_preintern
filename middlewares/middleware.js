import jwt from 'jsonwebtoken'
import { temp_users } from '../server.js';
import { validationResult } from 'express-validator';

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
        const secretKey = 'mysecret'; // chuuỗi secret test
        jwt.verify(token, secretKey, (err, payload) => {
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
    const existingUser = temp_users.find(u => u.email === email || u.username === username);

    if (existingUser) {
        return res.status(400).json({
            error: existingUser.email === email ? "Email đã tồn tại!" : "Người dùng đã tồn tại!"
        });
    }

    next();
};


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