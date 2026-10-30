import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
    {
    
    username: {
        types: String,
        require: true,
    },
    email: {
        types: String,
        unique: true,
    },
    password: {
        type: String
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    profile: {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        birthDate: {
            type: Date,
        },
        phone: {
            type: String
        }
    }
}
)

export const userModel = model("User",userSchema)