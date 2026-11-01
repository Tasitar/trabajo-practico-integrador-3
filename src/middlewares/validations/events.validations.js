import { body, param } from "express-validator";
import { eventModel } from "../../models/events.model.js";

export const validationCreateEvent = [
    body("title")
        .isString()
        .withMessage("El título debe ser texto")
        .isLength({ min: 3, max: 150 })
        .withMessage("El título debe tener entre 3 y 150 caracteres")
        .custom(async (title) => {
            const event = await eventModel.findOne({ title });
            if (event) throw new Error("Ya existe un evento con ese título");
        }),
    body("description")
        .isString()
        .withMessage("La descripción debe ser texto")
        .isLength({ min: 20 })
        .withMessage("La descripción debe tener al menos 20 caracteres"),
    body("startDate")
        .notEmpty()
        .withMessage("La fecha de inicio es obligatoria")
        .isISO8601({ strict: true })
        .withMessage("La fecha de inicio no es válida"),
    body("endDate")
        .notEmpty()
        .withMessage("La fecha de finalización es obligatoria")
        .isISO8601({ strict: true })
        .withMessage("La fecha de finalización no es válida"),
    body("capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("La capacidad debe ser un entero mayor o igual a 1"),
    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("El precio debe ser un número mayor o igual a 0"),
    body("status")
        .optional()
        .isIn(["scheduled", "cancelled", "finished"])
        .withMessage("El estado del evento no es válido"),
    body("categories")
        .optional()
        .isArray()
        .withMessage("Las categorías deben enviarse como un array"),
    body("categories.*")
        .isMongoId()
        .withMessage("Cada categoría debe tener un ObjectId válido"),
    body("location")
        .isObject()
        .withMessage("La ubicación es obligatoria y debe ser un objeto"),
    body("location.venue")
        .isString()
        .withMessage("El lugar debe ser texto")
        .notEmpty()
        .withMessage("El lugar es obligatorio")
        .isLength({ min: 2, max: 100 })
        .withMessage("El lugar debe tener entre 2 y 100 caracteres"),
    body("location.address")
        .isString()
        .withMessage("La dirección debe ser texto")
        .notEmpty()
        .withMessage("La dirección es obligatoria")
        .isLength({ min: 5, max: 200 })
        .withMessage("La dirección debe tener entre 5 y 200 caracteres"),
    body("location.city")
        .isString()
        .withMessage("La ciudad debe ser texto")
        .notEmpty()
        .withMessage("La ciudad es obligatoria")
        .isLength({ min: 2, max: 100 })
        .withMessage("La ciudad debe tener entre 2 y 100 caracteres"),
];

export const validationEventId = [
    param("id").isMongoId().withMessage("El id del evento no es válido"),
];

export const validationUpdateEvent = [
    body("title")
        .optional()
        .isString()
        .withMessage("El título debe ser texto")
        .isLength({ min: 3, max: 150 })
        .withMessage("El título debe tener entre 3 y 150 caracteres")
        .custom(async (title, { req }) => {
            const event = await eventModel.findOne({ title });
            if (event && event._id.toString() !== req.params.id) {
                throw new Error("Ya existe un evento con ese título");
            }
        }),
    body("description")
        .optional()
        .isString()
        .withMessage("La descripción debe ser texto")
        .isLength({ min: 20 })
        .withMessage("La descripción debe tener al menos 20 caracteres"),
    body("startDate")
        .optional()
        .isISO8601({ strict: true })
        .withMessage("La fecha de inicio no es válida"),
    body("endDate")
        .optional()
        .isISO8601({ strict: true })
        .withMessage("La fecha de finalización no es válida"),
    body("capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("La capacidad debe ser un entero mayor o igual a 1"),
    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("El precio debe ser un número mayor o igual a 0"),
    body("status")
        .optional()
        .isIn(["scheduled", "cancelled", "finished"])
        .withMessage("El estado del evento no es válido"),
    body("categories")
        .optional()
        .isArray()
        .withMessage("Las categorías deben enviarse como un array"),
    body("categories.*")
        .optional()
        .isMongoId()
        .withMessage("Cada categoría debe tener un ObjectId válido"),
    body("location")
        .optional()
        .isObject()
        .withMessage("La ubicación debe ser un objeto"),
    body("location.venue")
        .optional()
        .isString()
        .withMessage("El lugar debe ser texto")
        .notEmpty()
        .withMessage("El lugar no puede estar vacío")
        .isLength({ min: 2, max: 100 })
        .withMessage("El lugar debe tener entre 2 y 100 caracteres"),
    body("location.address")
        .optional()
        .isString()
        .withMessage("La dirección debe ser texto")
        .notEmpty()
        .withMessage("La dirección no puede estar vacía")
        .isLength({ min: 5, max: 200 })
        .withMessage("La dirección debe tener entre 5 y 200 caracteres"),
    body("location.city")
        .optional()
        .isString()
        .withMessage("La ciudad debe ser texto")
        .notEmpty()
        .withMessage("La ciudad no puede estar vacía")
        .isLength({ min: 2, max: 100 })
        .withMessage("La ciudad debe tener entre 2 y 100 caracteres"),
];
