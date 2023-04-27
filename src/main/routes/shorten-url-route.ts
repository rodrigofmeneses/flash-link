import { Router } from "express"
import { ShortenUrlRouteComposer } from "../composer/shorten-url-route-composer"
import { ExpressRouteAdapter } from "../adapters/express-route-adapter"

const router = Router()

const adapter = new ExpressRouteAdapter()
const shortenUrlRoute = new ShortenUrlRouteComposer().compose()
router.post("/shorten", async (req, res) => {
  adapter.adapt(shortenUrlRoute.route.bind(shortenUrlRoute))(req, res)
})

export default router
