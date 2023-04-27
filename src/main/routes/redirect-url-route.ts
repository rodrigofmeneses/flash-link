import { Router } from "express"
import { ExpressRouteAdapter } from "../adapters/express-route-adapter"
import { RedirectUrlRouteComposer } from "../composer/redirect-url-route-composer"

const router = Router()

const adapter = new ExpressRouteAdapter()
const redirectUrlRoute = new RedirectUrlRouteComposer().compose()
router.get("/:shortUrl", async (req, res) => {
  adapter.adapt(redirectUrlRoute.route.bind(redirectUrlRoute))(req, res)
})

export default router
