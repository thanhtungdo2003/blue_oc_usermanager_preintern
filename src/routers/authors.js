import express from "express";
import { authMiddleware, authorizeEdit, isAdmin } from "../middlewares/middleware.js";
import { authorCreate, authorDelete, authorGetAll, authorGetByID, authorUpdate } from "../controllers/authors.js";

const router = express.Router();

router.post(`/authors/:id`, authMiddleware, authorizeEdit, authorCreate);

router.put(`/authors/:id`, authMiddleware, authorizeEdit, authorUpdate);

router.delete(`/authors/:id`, authMiddleware, authorizeEdit, authorDelete);

router.get(`/authors/:id`, authMiddleware, authorizeEdit, authorGetByID);

router.get(`/authors`, authMiddleware, isAdmin, authorGetAll);

export default router;



