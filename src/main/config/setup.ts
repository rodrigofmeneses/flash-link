import { Express, json } from "express"
import docs from "./docs"

export const setupApp = (app: Express) => {
  app.disable("x-powered-by")
  app.use(json())
  app.use(docs)
}
