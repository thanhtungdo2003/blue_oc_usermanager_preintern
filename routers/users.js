import express from 'express';
import { login, userCreate, userDelete, userGetAll, userGetByID, userUpdate } from '../controllers/users.js';
import { authMiddleware, checkUserUnique, isAdmin, validate } from '../middlewares/middleware.js';
import { userValidationRules } from '../validators.js';


const userRouter = express.Router();

userRouter.post(`/users`, userValidationRules, validate, checkUserUnique, userCreate);

userRouter.post(`/users/login`, login);

userRouter.put(`/users/:id`, authMiddleware, isAdmin, userUpdate);

userRouter.get(`/users`, authMiddleware, isAdmin, userGetAll);

userRouter.get(`/users/:id`, authMiddleware, isAdmin, userGetByID);

userRouter.delete(`/users/:id`, authMiddleware, isAdmin, userDelete);

export default userRouter;