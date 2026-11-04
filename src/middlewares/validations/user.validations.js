import { body, param } from "express-validator";
import { userModel } from "../../models/user.model.js";

export const validationCreateUser = [

    body("username")
    .notEmpty()
    .withMessage("El nombre no debe estar vacio")
    .isLength({min: 3,max: 20})
    .withMessage("El user tiene que que contener 3 o 20 letras")
    .isAlphanumeric()
    .withMessage("El nombre debe contener letras y numeros")
    .custom(async (username) => {
        const user = await userModel.findOne({username})
        if (user) throw new Error("Ese username ya existe use otro") 
    }),

    body("email")
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email tiene que ser valido")
    .customSanitizer((email) => email.toLowerCase())
    .custom(async (email) => {
        const emailId = await userModel.findOne({email})
        if (emailId) throw new Error("Ese email ya existe use otro")
    }),

    body("password")
    .notEmpty()
    .withMessage("La contraseña es no puede estar vacia")
    .isLength({min: 8})
    .withMessage("la contraseña debe de tener minio 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("la contraseña debe contener al menos una mayuscula,una minuscula y un numero"),

    body('profile.firstName')
    .notEmpty()
    .withMessage('El nombre no debe estar vacio')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres') 
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre solo debe contener letras'),   
    
    body('profile.lastName') .notEmpty()
    .withMessage('El apellido no debe estar vacio') 
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres') 
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El apellido solo debe contener letras'),
]

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

export const validationUserId = [
    param("id").isMongoId().withMessage("El id del usuario no es válido"),
];

export const validationUpdateUser = [
    body("username")
        .optional()
        .isLength({ min: 3, max: 20 })
        .withMessage("El username debe tener entre 3 y 20 caracteres")
        .isAlphanumeric()
        .withMessage("El username debe contener solo letras y números")
        .custom(async (username, { req }) => {
            const user = await userModel.findOne({ username });
            if (user && user._id.toString() !== req.params.id) {
                throw new Error("Ese username ya existe");
            }
        }),
    body("email")
        .optional()
        .isEmail()
        .withMessage("El email tiene que ser válido")
        .customSanitizer((email) => email.toLowerCase())
        .custom(async (email, { req }) => {
            const user = await userModel.findOne({ email });
            if (user && user._id.toString() !== req.params.id) {
                throw new Error("Ese email ya existe");
            }
        }),
    body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener mínimo 8 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage("La contraseña debe incluir mayúscula, minúscula y número"),
    body("role")
        .optional()
        .isIn(["user", "admin"])
        .withMessage("El rol no es válido"),
    body("profile.firstName")
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El nombre solo debe contener letras"),
    body("profile.lastName")
        .optional()
        .isLength({ min: 2, max: 50 })
        .withMessage("El apellido debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("El apellido solo debe contener letras"),
];
