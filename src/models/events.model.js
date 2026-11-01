import { Schema, model } from "mongoose";

const locationSchema = new Schema(
    {
        venue: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
    },
    { _id: false }
);

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    capacity: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "La capacidad debe ser un número entero",
        },
    },
    price: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["scheduled", "cancelled", "finished"],
        default: "scheduled",
    },
    location: {
        type: locationSchema,
    },
    organizer: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
});

export const eventModel = model("Event", eventSchema);