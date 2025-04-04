import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/middleware.js";
import { genreCreate, genreDelete, genreGetAll, genreGetByID, genreUpdate } from "../controllers/genres.js";


const router = express.Router();

router.post(`/genres`, authMiddleware, isAdmin, genreCreate);

router.put(`/genres/:id`, authMiddleware, isAdmin, genreUpdate);

router.delete(`/genres/:id`, authMiddleware, isAdmin, genreDelete);

router.get(`/genres/:id`, genreGetByID);

router.get(`/genres`, genreGetAll);

export default router;



