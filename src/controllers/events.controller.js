import { matchedData } from "express-validator";
import { eventModel } from "../models/events.model.js";

export const createEvent = async (req, res) => {
    try {
        const eventData = matchedData(req, { locations: ["body"] });
        const event = await eventModel.create(eventData);

        return res.status(201).json({
            msg: "Evento creado correctamente",
            data: event,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al crear el evento",
        });
    }
};

export const getAllEvent = async (req, res) => {
    try {
        const events = await eventModel.find().populate("categories organizer");

        return res.status(200).json({
            msg: "Eventos obtenidos correctamente",
            data: events,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al obtener los eventos",
        });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = matchedData(req, { locations: ["params"] });
        const event = await eventModel.findById(id).populate("categories organizer");

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado",
            });
        }

        return res.status(200).json({
            msg: "Evento obtenido correctamente",
            data: event,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al obtener el evento",
        });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = matchedData(req, { locations: ["params"] });
        const updates = matchedData(req, { locations: ["body"] });
        const event = await eventModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado",
            });
        }

        return res.status(200).json({
            msg: "Evento actualizado correctamente",
            data: event,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al actualizar el evento",
        });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = matchedData(req, { locations: ["params"] });
        const event = await eventModel.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no encontrado",
            });
        }

        return res.status(200).json({
            msg: "Evento eliminado correctamente",
            data: event,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al eliminar el evento",
        });
    }
};