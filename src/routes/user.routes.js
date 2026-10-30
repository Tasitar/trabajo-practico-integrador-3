import { Router } from "express";
import {createUser,getAllUser,getUserById,updateUser,deleteUser,} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationCreateUser } from "../middlewares/validations/user.validations.js";

export const userRoutes = Router()

userRoutes.post("/users",validationCreateUser,validate,createUser)
userRoutes.get("/users", getAllUser)
userRoutes.get("/users/:id", getUserById)
userRoutes.put("/users/:id",validate, updateUser)
userRoutes.delete("/users/:id", deleteUser)
