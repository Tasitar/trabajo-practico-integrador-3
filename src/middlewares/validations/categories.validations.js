import { body, param } from "express-validator";

export const validationCreateCategory = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la categoría no debe estar vacío"),
    body("description").optional().trim().isString(),
];

export const validationCategoryId = [
    param("id").isMongoId().withMessage("El id de la categoría no es válido"),
];

export const validationUpdateCategory = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El nombre de la categoría no debe estar vacío"),
    body("description").optional().trim().isString(),
];