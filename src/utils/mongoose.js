import { connect, connection } from "mongoose";


const conn = {
    isConnected: false
}

export async function dbConnect() {
// Chequea si está conectado antes de conectar, para no conectar múltiples veces
    if (conn.isConnected) return;
    
    const db = await connect(process.env.MONGODB_URL);
    // Actualiza conn.isConnected a true
    conn.isConnected = db.connections[0].readyState;
    // Muestra a que base de datos se conecta
    console.log(db.connection.db.databaseName);
}

// Objeto con una serie de eventos para detectar errores, cosas que pasen o si la conexión está ok
// Ver mongoose events 
connection.on("connected", () => {
    console.log("MongoDB connected");
});

connection.on("error", (err) => {
    console.log(err);
});