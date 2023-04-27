import { Express, Router } from "express"
import shortUrlRoute from "../routes/shorten-url-route"

export const setupRoutes = (app: Express) => {
  const router = Router()
  app.use("/api/v1", router)
  router.use(shortUrlRoute)
}
