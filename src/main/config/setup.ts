import { Express, json } from "express"

export const setupApp = (app: Express) => {
  app.disable("x-powered-by")
  app.use(json())
}
