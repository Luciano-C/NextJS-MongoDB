import { dbConnect } from "utils/mongoose";
import { Task } from "models/task";


export default async function handler(req, res) {
    const { method, body, query: { id } } = req;
    switch (method) {
        case "GET":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;

        default:
            return res.status(400).json({msg: "This method is not supported"})
    }


}
