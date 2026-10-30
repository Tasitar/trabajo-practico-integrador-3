import { Router } from "express";

export const userRoutes = Router()

userRoutes.post("/users", cretaeUser)
userRoutes.get("/users", getAllUser)
userRoutes.get("/users", getUserById)
userRoutes.put("/users", updateUser)
userRoutes.delete("/users", deleteUser)

