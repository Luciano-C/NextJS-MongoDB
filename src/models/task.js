import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        // Con el arreglo manda "Title is required" cuando hay error
        required: [true, "Title is required"],
        unique: true,
        // Quita los espacios al final y al inicio cuando guarda
        trim: true,
        maxlength: [40, "Title must be less than 40 characters"]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, "Title must be less than 200 characters"]
    }
}, {
    timestamps: true,
    // Mongoose crea un campo __uv, con versionKey: false se desactiva
    versionKey: false
})

// Si no está el modelo se crea, si ya está se exporta directamente.
export default models.Task || model("Task", taskSchema)