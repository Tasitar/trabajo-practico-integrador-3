import { Router } from "express";
import { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } from "../controllers/categories.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationCategoryId, validationCreateCategory, validationUpdateCategory } from "../middlewares/validations/categories.validations.js";
import { authenticate, requireAdmin } from "../middlewares/auth.js";

export const categoryRoutes = Router()

categoryRoutes.post("/categories", authenticate, requireAdmin, validationCreateCategory, validate, createCategory)
categoryRoutes.get("/categories", getAllCategory)
categoryRoutes.get("/categories/:id", validationCategoryId, validate, getCategoryById)
categoryRoutes.put("/categories/:id", authenticate, requireAdmin, validationCategoryId, validationUpdateCategory, validate, updateCategory)
categoryRoutes.delete("/categories/:id", authenticate, requireAdmin, validationCategoryId, validate, deleteCategory)