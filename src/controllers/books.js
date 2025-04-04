import Book from "../models/books.js";

export const bookCreate = (req, res) => {
    const {genreId, userId, title} = req.body;
    if (!genreId || !userId || !title) return res.status(400).json({ error: "Lỗi ", message: "thông tin không xác định" });
    Book.create(genreId, userId, title).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const bookUpdate = (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    const {genreId, userId, title, publishYear} = req.body;
    if (!genreId || !userId || !title || !publishYear) return res.status(400).json({ error: "Lỗi ", message: "thông tin không xác định" });
    Book.update(id, genreId, userId, title, publishYear).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}
export const bookDelete = (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    Book.delete(id).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}
export const bookGetAll = (req, res) => {
    Book.getAll().then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const bookGetByID = (req, res) => {
    const {id} = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    Book.getById(id).then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}