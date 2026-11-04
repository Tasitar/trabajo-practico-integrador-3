import { Router } from "express";
import { createEvent, getAllEvent, getEventById, updateEvent, deleteEvent } from "../controllers/events.controller.js";
import { validate } from "../middlewares/validate.js";
import { validationCreateEvent, validationEventId, validationUpdateEvent } from "../middlewares/validations/events.validations.js";
import { authenticate, requireAdmin } from "../middlewares/auth.js";

export const eventRoutes = Router()

eventRoutes.post("/events", authenticate, requireAdmin, validationCreateEvent, validate, createEvent)
eventRoutes.get("/events", getAllEvent)
eventRoutes.get("/events/:id", validationEventId, validate, getEventById)
eventRoutes.put("/events/:id", authenticate, requireAdmin, validationEventId, validationUpdateEvent, validate, updateEvent)
eventRoutes.delete("/events/:id", authenticate, requireAdmin, validationEventId, validate, deleteEvent)