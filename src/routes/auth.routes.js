import { Router } from "express";
import { getUserProfile, login, logout, updateUserProfile  } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationLogin } from "../middlewares/validations/auth.validations.js";
import { authenticate } from "../middlewares/auth.js";
import { createUser as register } from "../controllers/user.controller.js"; //importo la funcion create de user para reutilizarla en register
import { validationCreateUser } from "../middlewares/validations/user.validations.js";

export const authRoutes = Router();

authRoutes.post("/auth/login", validationLogin, validate, login);
authRoutes.post("/auth/logout", authenticate, logout);
authRoutes.post("/auth/register",validationCreateUser,validate, register)
authRoutes.get("/auth/profile", authenticate,getUserProfile);
authRoutes.put("/auth/profile", authenticate,updateUserProfile )

//Epicacontraseña2
//"email":"alejosan@gmail.com",