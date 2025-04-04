import express from 'express';
import { login, userRegister, userDelete, userGetAll, userGetByID, userUpdate, setRole } from '../controllers/users.js';
import { authMiddleware, checkUserUnique, isAdmin, validate } from '../middlewares/middleware.js';
import { userValidationRules } from '../../validators.js';


const userRouter = express.Router();

userRouter.post(`/users`, userValidationRules, validate, checkUserUnique, userRegister);

userRouter.post(`/users/login`, login);

userRouter.patch(`/users/:id`, authMiddleware, userUpdate);

userRouter.put(`/users/:id/:role`, authMiddleware, isAdmin, setRole);

userRouter.get(`/users`, authMiddleware, isAdmin, userGetAll);

userRouter.get(`/users/:id`, authMiddleware, isAdmin, userGetByID);

userRouter.delete(`/users/:id`, authMiddleware, isAdmin, userDelete);

export default userRouter;