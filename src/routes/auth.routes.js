import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationLogin } from "../middlewares/validations/auth.validations.js";

export const authRoutes = Router();

authRoutes.post("/auth/login", validationLogin, validate, login);
authRoutes.post("/auth/login", validationLogin, validate, login);
