import { userModel } from "../models/user.model.js";
import { verifyToken } from "../helpers/jwt.helper.js";

export const authenticate = async (req, res, next) => {
    const authorization = req.get("authorization");
    const [scheme, token, ...extraParts] = authorization?.split(" ") ?? [];

    if (scheme !== "Bearer" || !token || extraParts.length > 0) {
        return res.status(401).json({
            msg: "Falta un token Bearer válido",
        });
    }

    let payload;
    try {
        payload = verifyToken(token);
    } catch (error) {
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({
                msg: "El token no es válido o expiró",
            });
        }
        return res.status(500).json({
            msg: "No se pudo verificar el token",
        });
    }

    try {
        const user = await userModel.findById(payload.sub);
        if (!user) {
            return res.status(401).json({
                msg: "El usuario del token ya no existe",
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        return next(error);
    }
};

export const requireAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            msg: "No tenés permisos para realizar esta acción",
        });
    }
    return next();
};
