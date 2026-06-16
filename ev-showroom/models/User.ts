import mongoose, { Schema, models, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

export default models.User || model("User", userSchema);