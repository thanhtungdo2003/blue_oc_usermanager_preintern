import Book from "../models/books.js";


export const getTopBorrowedBooks = (req, res) => {
    const { month } = req.params;
    if (!month) return res.status(400).json({ error: "Lỗi ", message: "Tháng không hợp lệ!" });
    Book.getTopBorrowedBooks(month, 20).then(result => {
        return res.json(result);
    }).catch(err => {
        console.error("Lỗi:", err);
        return res.status(400).json({ error: "Lỗi ", message: err.message });
    })
}