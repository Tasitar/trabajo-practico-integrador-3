import { body } from "express-validator";

export const validationLogin = [
    body("email")
        .trim()
        .isEmail()
        .withMessage("El email tiene que ser válido")
        .customSanitizer((email) => email.toLowerCase()),
    body("password")
        .isString()
        .withMessage("La contraseña es obligatoria")
        .notEmpty()
        .withMessage("La contraseña es obligatoria"),
];
