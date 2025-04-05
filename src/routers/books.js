import express from "express";
import { authMiddleware, authorizeEdit, isAdmin } from "../middlewares/middleware.js";
import { bookCreate, bookDelete, bookGetAll, bookGetByID, bookUpdate, borrowCreate } from "../controllers/books.js";


const router = express.Router();

router.post(`/`, authMiddleware, isAdmin, bookCreate);

router.put(`/:id`, authMiddleware, isAdmin, bookUpdate);

router.delete(`/:id`, authMiddleware, isAdmin, bookDelete);

router.post(`/books-borrowing/:id`, authMiddleware, authorizeEdit, borrowCreate);

router.get(`/:id`, bookGetByID);

router.get(`/`, bookGetAll);

export default router;



