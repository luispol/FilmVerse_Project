//Importaciones necesarias de librerias y fucniones para poder realizar configuraciones
import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import usuariosRoutes from './routes/usuarioRoutes.js'

const app = express()
app.use(express.json())

//Funcion para llamar a las variables de entorno
dotenv.config()

//Funcion para poder conectarnos a la base de datos
conectarDB()

//Rutas
app.use('/api/usuarios', usuariosRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`El sevidor esta corriendo en el puerto: ${PORT}`)
})