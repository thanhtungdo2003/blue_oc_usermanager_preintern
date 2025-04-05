import express from "express";
import { authMiddleware, authorizeEdit, isAdmin } from "../middlewares/middleware.js";
import { authorCreate, authorDelete, authorGetAll, authorGetByID, authorUpdate } from "../controllers/authors.js";

const router = express.Router();

router.post(`/`, authMiddleware, isAdmin, authorCreate);

router.put(`/:id`, authMiddleware, isAdmin, authorUpdate);

router.delete(`/:id`, authMiddleware, isAdmin, authorDelete);

router.get(`/:id`, authorGetByID);

router.get(`/`, authorGetAll);

export default router;



