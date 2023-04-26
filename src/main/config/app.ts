import express from "express"
import { setupApp } from "./setup"
import { setupRoutes } from "./routes"

export const app = express()

setupApp(app)
setupRoutes(app)
