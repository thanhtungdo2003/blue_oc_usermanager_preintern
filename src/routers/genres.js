import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/middleware.js";
import { genreCreate, genreDelete, genreGetAll, genreGetByID, genreUpdate } from "../controllers/genres.js";


const router = express.Router();

router.post(`/`, authMiddleware, isAdmin, genreCreate);

router.put(`/:id`, authMiddleware, isAdmin, genreUpdate);

router.delete(`/:id`, authMiddleware, isAdmin, genreDelete);

router.get(`/:id`, genreGetByID);

router.get(`/`, genreGetAll);

export default router;



