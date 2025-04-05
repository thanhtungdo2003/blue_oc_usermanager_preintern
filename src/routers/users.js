import express from 'express';
import { login, userRegister, userDelete, userGetAll, userGetByID, userUpdate, setRole } from '../controllers/users.js';
import { authMiddleware, checkUserUnique, isAdmin, validate } from '../middlewares/middleware.js';
import { userValidationRules } from '../../validators.js';


const userRouter = express.Router();

userRouter.post(`/`, userValidationRules, validate, checkUserUnique, userRegister);

userRouter.post(`/login`, login);

userRouter.patch(`/:id`, authMiddleware, userUpdate);

userRouter.put(`/:id/:role`, authMiddleware, isAdmin, setRole);

userRouter.get(`/`, authMiddleware, isAdmin, userGetAll);

userRouter.get(`/:id`, authMiddleware, isAdmin, userGetByID);

userRouter.delete(`/:id`, authMiddleware, isAdmin, userDelete);

export default userRouter;