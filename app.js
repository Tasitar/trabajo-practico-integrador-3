import express from "express"
import "dotenv/config"
import { startDB } from "./src/config/database.js"
import { userRoutes } from "./src/routes/user.routes.js"
import { categoryRoutes } from "./src/routes/categories.routes.js"
import { eventRoutes } from "./src/routes/events.routes.js"

const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", eventRoutes)

app.listen(PORT, async() => {
    console.log(`Server prendido en el puerto ${PORT}`);
    await startDB()
})
