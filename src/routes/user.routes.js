import { Router } from "express";
import {createUser,getAllUser,getUserById,updateUser,deleteUser,} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationCreateUser,validationUpdateUser,validationUserId } from "../middlewares/validations/user.validations.js";
import { authenticate } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/admin.js";
export const userRoutes = Router()

userRoutes.post("/users",validationCreateUser,validate,createUser)
userRoutes.get("/users", authenticate,requireAdmin,getAllUser)
userRoutes.get("/users/:id", authenticate,requireAdmin,validationUserId,validate,getUserById)
userRoutes.put("/users/:id", authenticate,requireAdmin,validationUserId,validationUpdateUser,validate,updateUser)
userRoutes.delete("/users/:id", authenticate,requireAdmin,validationUserId,validate,deleteUser)
