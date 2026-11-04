import { Router } from "express";
import {createUser,login,getAllUser,getUserById,updateUser,deleteUser,} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationCreateUser,validationLogin,validationUpdateUser,validationUserId } from "../middlewares/validations/user.validations.js";
import { authenticate,requireAdmin } from "../middlewares/auth.js";

export const userRoutes = Router()

userRoutes.post("/users",validationCreateUser,validate,createUser)
userRoutes.post("/auth/login",validationLogin,validate,login)
userRoutes.get("/users", authenticate,requireAdmin,getAllUser)
userRoutes.get("/users/:id", authenticate,requireAdmin,validationUserId,validate,getUserById)
userRoutes.put("/users/:id", authenticate,requireAdmin,validationUserId,validationUpdateUser,validate,updateUser)
userRoutes.delete("/users/:id", authenticate,requireAdmin,validationUserId,validate,deleteUser)
