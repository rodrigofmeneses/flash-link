import { connectMongo } from "../infra/helpers/mongo-helper"
import { app } from "./config/app"
import { env } from "./config/env"

connectMongo(env.MONGO_URL)
  .then(() => {
    app.listen(env.PORT, () =>
      console.log(`Server running at http://localhost:${env.PORT}`)
    )
  })
  .catch(console.error)
