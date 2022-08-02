import { dbConnect } from "utils/mongoose";
import Task from "models/task";

dbConnect();

export default async function handler(req, res) {
    const { method, body, query: { id } } = req;
    switch (method) {
        case "GET":
            try {
                const task = await Task.findById(id);
                if (!task) return res.status(404).json({ msg: "Task not found" });
                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({ msg: error.message })
            }
        case "PUT":
            try {
                // El tercer argumento {new: true} indica que devuelva el objecto actualizado, no el previo.
                const task = await Task.findByIdAndUpdate(id, body, { new: true });
                if (!task) return res.status(404).json({ msg: "Task not found" });
                return res.status(200).json(task);
            } catch (error) {
                return res.status(500).json({ msg: error.message })
            }
        case "DELETE":
            try {
                const deletedTask = await Task.findByIdAndDelete(id);
                if (!deletedTask) return res.status(400).json({ msg: "Task not found" });
                return res.status(204).json();
            } catch (error) {
                return res.status(400).json({ msg: error.message })
            }

        default:
            return res.status(400).json({ msg: "This method is not supported" });
    }


};
