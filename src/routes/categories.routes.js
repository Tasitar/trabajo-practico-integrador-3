import { Router } from "express";
import { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } from "../controllers/categories.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationCategoryId, validationCreateCategory, validationUpdateCategory } from "../middlewares/validations/categories.validations.js";

export const categoryRoutes = Router()

categoryRoutes.post("/categories", validationCreateCategory, validate, createCategory)
categoryRoutes.get("/categories", getAllCategory)
categoryRoutes.get("/categories/:id", validationCategoryId, validate, getCategoryById)
categoryRoutes.put("/categories/:id", validationCategoryId, validationUpdateCategory, validate, updateCategory)
categoryRoutes.delete("/categories/:id", validationCategoryId, validate, deleteCategory)