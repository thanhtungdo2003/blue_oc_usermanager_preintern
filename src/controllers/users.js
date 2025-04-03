import User from "../models/users.js";


export const userRegister = (req, res) => {
    const model = req.body;
    if (!model) res.status(400).json({ error: "Lỗi ", details: "Thiếu thông tin đăng ký" });
    const { username, email, password } = model;
    if (!username || !password || !email) return res.status(400).json({ detail: "Thiếu thông tin đăng ký" });

    User.register(username, email, password).then(token => {
        return res.json({ token: token });
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}
export const login = (req, res) => {
    const model = req.body;
    if (!model) return res.status(400).json({ detail: "Tài khoản hoặc mật khẩu không chính xác!" });
    const { username, password } = model;
    if (!username || !password) return res.status(400).json({ detail: "Tài khoản hoặc mật khẩu không chính xác!" });
    User.login(username, password).then(token => {
        return res.json({ token: token });
    }).catch(err => {
        console.error("Lỗi:", err.message);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}
export const userUpdate = (req, res) => {
    const model = req.body;
    const { id } = req.params;
    if (!model || !id) return res.status(400).json({ detail: "Thiếu thông tin cập nhật" });
    const { email, username, password } = model;
    if (!username || !email) return res.status(400).json({ detail: "Thiếu thông tin cập nhật" });
    User.update(id, username, email, password).then(res => {
        return res.json({ detail: "Cập nhật thành công!" });
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const userGetAll = (req, res) => {
    User.getAll().then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const userGetByID = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ detail: "Người dùng không tồn tại" });
    User.getById(id).then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}


export const userDelete = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ detail: "Người dùng không tồn tại" });
    User.delete(id).then(message => {
        return res.json({ detail: message });
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const setRole = (req, res) => {
    const { id, role } = req.params;
    if (!id) return res.status(400).json({ detail: "Người dùng không tồn tại" });
    User.setRole(id, role).then(message => {
        return res.json({ detail: message });
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}