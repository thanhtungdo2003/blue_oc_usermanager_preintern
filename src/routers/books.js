import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/middleware.js";
import { bookCreate, bookDelete, bookGetAll, bookGetByID, bookUpdate } from "../controllers/books.js";


const router = express.Router();

router.post(`/books`, authMiddleware, isAdmin, bookCreate);

router.put(`/books/:id`, authMiddleware, isAdmin, bookUpdate);

router.delete(`/books/:id`, authMiddleware, isAdmin, bookDelete);

router.get(`/books/:id`, bookGetByID);

router.get(`/books`, bookGetAll);

export default router;



