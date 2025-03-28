import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
import { message } from '../service.js';
import jwt from 'jsonwebtoken'
import { temp_users } from '../server.js';




async function hashPassword(password) {
    const saltRounds = 10; // Số vòng lặp để tăng độ bảo mật
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

class User {
    // đăng nhập
    static login(username, password, callback) {
        const user = temp_users.find(u => u.username === username);
        if (!user) return callback("Người dùng không tồn tại", null);

        const isValid = bcrypt.compareSync(password, user.hasspass);

        if (isValid) {
            console.log(message("USER-LOGIN", "người dùng " + username + " đã truy cập"));

            const userPayload = {
                username: user.username,
                email: user.email,
                role: user.role,
                fullname: user.fullname
            }
            const token = jwt.sign(userPayload, "mysecret", { expiresIn: "6h" }); //secret test

            return callback(null, token);
        }
        callback("Mật khẩu hoặc tài khoản không chính xác!", null);
    }
    // tạo người dùng
    static async create(model, callback) {
        console.log(message("USER-CREATE", "tạo người dùng"));
        const { username, fullname, password, email, role } = model;
        if (!username || !fullname || !password || !email) {
            return callback("thiếu thông tin người dùng", null);
        }
        model.id = randomUUID();
        model.hasspass = await hashPassword(password);
        delete model.password;
        temp_users.push(model);
        callback(null, model);
    }
    // lấy danh sách người dùng
    static getAll(callback) {
        console.log(message("USER-GETALL", "Lấy danh sách người dùng"));
        const users = temp_users.map(({ hasspass, ...rest }) => rest);

        callback(null, users);
    }
    //Lấy thông tin người dùng
    static getById(id, callback) {
        console.log(message("USER-GET-BY-ID", "Lấy thông tin người dùng"));
        const user = temp_users.find(userItem => userItem.id === id);
        delete user.hasspass;
        if (user) {
            return callback(null, user);
        }
        callback("Người dùng không tồn tại", null)
    }
    // cập nhật thông tin người dùng
    static update(id, model, callback) {
        console.log(message("USER-UPDATE", "sửa người dùng"));
        const { username, fullname, password, email, role } = model;
        if (!username || !fullname || !password || !email) {
            return callback(null, "thiếu thông tin người dùng");
        }
        const index = temp_users.findIndex(user => user.id === id);
        if (index != -1) {
            model.hasspass = hashPassword(password);
            delete model.password;
            temp_users[index] = model;
            return callback(model, null);
        }
        callback("Người dùng không tồn tại", null)

    }
    //Xóa người dùng
    static delete(id, callback) {
        console.log(message("USER-DELETE", "xóa người dùng"));

        const index = temp_users.findIndex(user => user.id === id);
        if (index != -1) {
            temp_users.splice(index, 1);
            return callback("Đã xóa người dùng với id: " + id, null);
        }
        callback("Người dùng không tồn tại", null)

    }
}
export default User;