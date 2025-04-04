import express from "express";
import { authMiddleware, authorizeEdit, isAdmin } from "../middlewares/middleware.js";
import { authorCreate, authorDelete, authorGetAll, authorGetByID, authorUpdate } from "../controllers/authors.js";

const router = express.Router();

router.post(`/authors/:id`, authMiddleware, isAdmin, authorCreate);

router.put(`/authors/:id`, authMiddleware, isAdmin, authorUpdate);

router.delete(`/authors/:id`, authMiddleware, isAdmin, authorDelete);

router.get(`/authors/:id`, authorGetByID);

router.get(`/authors`, authorGetAll);

export default router;



