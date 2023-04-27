import { Express, Router } from "express"
import shortUrlRoute from "../routes/shorten-url-route"
import redirectUrlRoute from "../routes/redirect-url-route"

export const setupRoutes = (app: Express) => {
  const router = Router()
  app.use("/api/v1", router)
  app.use(redirectUrlRoute)
  router.use(shortUrlRoute)
}
