import express, {json} from "express";
import dotenv from "dotenv";
import path from "path";
import test_Conexion from "./Controlador/test_Conexion.js";
import router from "./Routers/router_mysql.js";

//Permitimos la conceccion con el .env
dotenv.config();
const PORT = process.env.PORT;

//Iniciamos express
const app = express();


//Para que acepte json
app.use(json());
test_Conexion();

  



//url  que no este aqui se va al error del middleware
//-------------Gateway-------------------------
app.use("/api", router);



//Middleware para manejar rutas que no existen, 
// con res envio las cosas a lo parte visual del cliente, 
// req almacena el body o los datos a procesar
app.use((req,res)=>{
  res.status(500).json({
        Estado: false,
        Respuesta: "Ruta no encontrada",
        Status: 500
    });
})

app.listen(PORT, () => {
    console.log(`Servidor Activo http://localhost:${PORT}`);
});