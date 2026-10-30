import { validationResult } from "express-validator";

export const validate = (req,res, next) => {
    const error = validationResult(req)

    if(!error.isEmpty()) {
        const custom = error.formatWith((err)=>{
            return `${err.path}: ${err.msg}`
        });
        return res.status(400).json(custom.array())
    }
    next()
}