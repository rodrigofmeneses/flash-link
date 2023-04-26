import { Express, Router } from "express"

export const setupRoutes = (app: Express) => {
  const router = Router()
  app.use("/api/v1", router)

  router.get("", (req, res) => {
    res.send({ message: "Flash Link API" })
  })
}
