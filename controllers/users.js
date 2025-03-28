import User from "../models/users.js";

export const userCreate = (req, res) =>{
    const model = req.body;
    User.create(model, (err, result)=>{
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", err });
        }
        return res.json(result);
    });
}
export const login = (req, res) =>{
    const model = req.body;
    if (!model) return res.status(400).json({detail:"Tài khoản hoặc mật khẩu không chính xác!"});
    const {username, password} = model;
    if (!username || !password) return res.status(400).json({detail:"Tài khoản hoặc mật khẩu không chính xác!"});
    User.login(username, password, (err, token)=>{
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", err });
        }
        return res.json(token);
    });
}
export const userUpdate = (req, res) =>{
    const model = req.body;
    const {id} = req.id;
    User.update(id, model, (err, result)=>{
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", err });
        }
        return res.json(result);
    });
}

export const userGetAll = (req, res) =>{
    User.getAll((err, result)=>{
        if (err) {
            console.error("Lỗi: ", err);
            return res.status(500).json({ error: "Lỗi ", err });
        }
        return res.json(result);
    });
}

export const userGetByID = (req, res) =>{
    const {id} = req.params;
    User.getById(id, (err, result)=>{
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", err });
        }
        return res.json(result);
    });
}


export const userDelete = (req, res) =>{
    const {id} = req.params;
    User.delete(id, (err, result)=>{
        if (err) {
            console.error("Lỗi:", err);
            return res.status(500).json({ error: "Lỗi ", err });
        }
        return res.json(result);
    });
}