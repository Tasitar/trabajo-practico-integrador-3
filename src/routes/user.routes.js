import { Router } from "express";
import {createUser,getAllUser,getUserById,updateUser,deleteUser,} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";

export const userRoutes = Router()

userRoutes.post("/users",validate ,createUser)
userRoutes.get("/users", getAllUser)
userRoutes.get("/users/:id", getUserById)
userRoutes.put("/users/:id",validate, updateUser)
userRoutes.delete("/users/:id", deleteUser)
