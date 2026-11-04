import { matchedData } from "express-validator";
import { userModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { createToken } from "../helpers/jwt.helper.js";


export const createUser = async (req, res) => {
    try {

        const { username, email, password, profile } = matchedData(req, { locations: ["body"] });
        const hashedPassword = await hashPassword(password);

        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            profile,
        });

        return res.status(201).json({
            msg: "Se creo el usuario Correctamente",
            data: newUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al crear el usuario",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = matchedData(req, { locations: ["body"] });
        const user = await userModel.findOne({ email }).select("+password");

        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json({
                msg: "Email o contraseña incorrectos",
            });
        }

        return res.status(200).json({
            msg: "Inicio de sesión correcto",
            data: {
                user: user.toJSON(),
                token: createToken(user),
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al iniciar sesión",
        });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find();

        return res.status(200).json({
            msg: "Usuarios obtenidos correctamente",
            data: users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al obtener los usuarios",
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }

        return res.status(200).json({
            msg: "Usuario obtenido correctamente",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al obtener el usuario",
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = matchedData(req, { locations: ["params"] });
        const updates = matchedData(req, { locations: ["body"] });
        if (updates.password) {
            updates.password = await hashPassword(updates.password);
        }
        const user = await userModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ok: false, msg:"Usuario no encontrado"})
        }
        return res.status(200).json({
            msg: "Usuario actualizado correctamente",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al actualizar el usuario",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }

        return res.status(200).json({
            msg: "Usuario eliminado correctamente",
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error interno del server al eliminar el usuario",
        });
    }
};