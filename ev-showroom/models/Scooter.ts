import mongoose from "mongoose";

const ScooterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        range: {
            type: Number,
            required: true,
        },

        topSpeed: {
            type: Number,
            required: true,
        },

        battery: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        images: {
            type: [String],
            default: [],
        },

        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Scooter ||
mongoose.model("Scooter", ScooterSchema);