import swaggerUi from "swagger-ui-express"
import { Router } from "express"
import fs from "fs"
import YAML from "yaml"

const file = fs.readFileSync("./swagger.yaml", "utf8")
const swaggerDocument = YAML.parse(file)
const router = Router()

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default router
