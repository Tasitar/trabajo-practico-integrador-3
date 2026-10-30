import { body } from "express-validator";
import { userModel } from "../../models/user.model.js";

export const validationCreateUser = [

    body("username")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .isLength({min: 3,max: 20})
    .withMessage("El user tiene que que contener 3 o 20 letras")
    .isAlphanumeric()
    .withMessage("El nombre debe contener letras y numeros")
]

