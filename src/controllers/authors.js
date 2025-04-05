import Author from "../models/authors.js";

export const authorCreate = (req, res) => {
    const {authorName} = req.body;
    if (!authorName) return res.status(400).json({ error: "Lỗi ", message: "thông tin không xác định" });
    Author.create(authorName).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const authorUpdate = (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    const {authorName, contributionPoints} = req.body;
    if (!contributionPoints || !authorName) return res.status(400).json({ error: "Lỗi ", message: "thông tin không xác định" });
    Author.update(id, authorName, contributionPoints).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}
export const authorDelete = (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    Author.delete(id).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}
export const authorGetAll = (req, res) => {
    Author.getAll().then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const authorGetByID = (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    Author.getById(id).then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}