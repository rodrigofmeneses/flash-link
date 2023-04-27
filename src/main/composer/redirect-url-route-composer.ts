import { UrlRedirector } from "../../domain/use-cases/redirect-url"
import { MongoLoadUrlByShortUrlRepositoryAdapter } from "../../infra/repositories/mongo/load-url-by-short-url-adapter"
import { RedirectUrlRoute } from "../../presentation/routes/redirect-url-route"

export class RedirectUrlRouteComposer {
  compose(): RedirectUrlRoute {
    const loadUrlByShortUrlRepository =
      new MongoLoadUrlByShortUrlRepositoryAdapter()

    const urlRedirector = new UrlRedirector(loadUrlByShortUrlRepository)

    return new RedirectUrlRoute(urlRedirector)
  }
}
