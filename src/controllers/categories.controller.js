import { matchedData } from "express-validator";
import { categoryModel } from "../models/categories.model.js";

export const createCategory = async (req, res) => {
    try {
        const categoryData = matchedData(req, { locations: ["body"] });
        const category = await categoryModel.create(categoryData);

        return res.status(201).json({
            msg: "Categoría creada correctamente",
            data: category,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al crear la categoría",
        });
    }
};

export const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find();

        return res.status(200).json({
            msg: "Categorías obtenidas correctamente",
            data: categories,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al obtener las categorías",
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {

        const { id } =matchedData(req,{locations:["params"]});

        const category = await categoryModel.findById(id).populate("events");

        if (!category) {
            return res.status(404).json({
                ok: false,
                msg: "Categoría no encontrada",
            });
        }

        return res.status(200).json({
            msg: "Categoría obtenida correctamente",
            data: category,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al obtener la categoría",
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = matchedData(req, { locations: ["params"] });
        const updates = matchedData(req, { locations: ["body"] });

        const category = await categoryModel.findByIdAndUpdate(id,updates,{ new: true, runValidators: true });

        if (!category) {
            return res.status(404).json({
                ok: false,
                msg: "Categoría no encontrada",
            });
        }

        return res.status(200).json({
            msg: "Categoría actualizada correctamente",
            data: category,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al actualizar la categoría",
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = matchedData(req, { locations: ["params"] });
        const category = await categoryModel.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                ok: false,
                msg: "Categoría no encontrada",
            });
        }

        return res.status(200).json({
            msg: "Categoría eliminada correctamente",
            data: category,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al eliminar la categoría",
        });
    }
};
