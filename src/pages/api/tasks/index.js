
// utils/mongoos en vez de ../../../utils/mongoose por la configuración en jsconfig.json
import { dbConnect } from "utils/mongoose";
import Task from "models/task";


dbConnect();

export default async function handler(req, res) {
    const { method, body } = req;

    switch (method) {

        case "GET":
            try {
                const tasks = await Task.find();
                return res.status(200).json(tasks);
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }

        case "POST":
            try {
                const newTask = new Task(body);
                const savedTask = await newTask.save();

                return res.status(201).json(savedTask);
            } catch (error) {
                // Poner status (500) es muy básico. Se debería entregar un status dependiendo del error, por ahora se deja así.
                res.status(500).json({ error: error.message });
            }


        default:
            return res.status(400).json({ msg: "This method is not supported" });
    }









}