import { Schema, model } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

categorySchema.virtual("events", {
    ref: "Event",
    localField: "_id",
    foreignField: "categories",
});

export const categoryModel = model("Category", categorySchema);