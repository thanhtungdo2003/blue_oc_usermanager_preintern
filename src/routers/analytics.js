import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/middleware.js";
import { getTopBorrowedBooks } from "../controllers/analytics.js";

const router = express.Router();

router.get(`/books/most-by-month/:month`, authMiddleware, isAdmin, getTopBorrowedBooks);


export default router;