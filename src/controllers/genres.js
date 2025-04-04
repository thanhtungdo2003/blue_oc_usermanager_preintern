import Genre from "../models/genres.js";

export const genreCreate = (req, res) => {
    const { genreName, genreParentId} = req.body;
    if (!genreName) return res.status(400).json({ error: "Lỗi ", message: "thông tin không xác định" });
    Genre.create(genreName, genreParentId).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const genreUpdate = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    const { genreName, genreParentId } = req.body;
    if (!genreName) return res.status(400).json({ error: "Lỗi ", message: "thông tin không xác định" });
    Genre.update(id, genreName, genreParentId).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}
export const genreDelete = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    Genre.delete(id).then(message => {
        return res.json(message);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}
export const genreGetAll = (req, res) => {
    Genre.getAll().then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}

export const genreGetByID = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Lỗi ", message: "Id không hợp lệ" });
    Genre.getById(id).then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}