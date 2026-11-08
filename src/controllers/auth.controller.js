import { matchedData } from "express-validator";
import { comparePassword } from "../helpers/bcrypt.helper.js";
import { createToken } from "../helpers/jwt.helper.js";
import { userModel } from "../models/user.model.js";

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
