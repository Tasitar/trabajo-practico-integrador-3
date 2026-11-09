export const requireAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            msg: "No tenés permisos para realizar esta acción",
        });
    }
    return next();
};