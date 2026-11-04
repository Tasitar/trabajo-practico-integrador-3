import jwt from "jsonwebtoken";

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET no está configurado");
    }
    return secret;
};

export const createToken = (user) =>
    jwt.sign(
        { role: user.role },
        getJwtSecret(),
        {
            subject: user._id.toString(),
            expiresIn: process.env.JWT_EXPIRE_IN || "1h",
        }
    );

export const verifyToken = (token) => jwt.verify(token, getJwtSecret());