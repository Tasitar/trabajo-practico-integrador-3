import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
    
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
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