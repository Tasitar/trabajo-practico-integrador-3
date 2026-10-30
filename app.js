import express from "express"
import "dotenv/config"
import { startDB } from "./src/config/database.js"
import { userRoutes } from "./src/routes/user.routes.js"

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.use("/api", userRoutes)

app.listen(PORT, async() => {
    console.log(`Server prendido en el puerto ${PORT}`);
    await startDB()
})
