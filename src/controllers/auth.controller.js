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

    const token = createToken({
      user_id: user._id,
      username: user.username,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Inicio de sesión correcto",

    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del server al iniciar sesión",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "logout exitoso" });
};
