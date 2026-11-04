import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
    
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
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

userSchema.set("toJSON", {
    transform(_document, returnedObject) {
        delete returnedObject.password;
        return returnedObject;
    },
});

export const userModel = model("User",userSchema)