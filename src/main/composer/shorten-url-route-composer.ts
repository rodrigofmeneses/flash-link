import { UrlShortener } from "../../domain/use-cases/shorten-url"
import { MongoAddUrlRepositoryAdapter } from "../../infra/repositories/mongo/add-url-adapter"
import { MongoLoadUrlByLongUrlRepositoryAdapter } from "../../infra/repositories/mongo/load-url-by-long-url-adapter"
import { ShortenUrlRoute } from "../../presentation/routes/shorten-url-route"
import { Base62EncoderAdapter } from "../../utils/adapters/base62-encoder-adapter"
import { UuidNumberGeneratorAdapter } from "../../utils/adapters/uuid-number-generator-adapter"

export class ShortenUrlRouteComposer {
  compose(): ShortenUrlRoute {
    const loadUrlByLongUrlRepository =
      new MongoLoadUrlByLongUrlRepositoryAdapter()
    const addUrlRepository = new MongoAddUrlRepositoryAdapter()
    const encoder = new Base62EncoderAdapter()
    const generator = new UuidNumberGeneratorAdapter()

    const urlShortener = new UrlShortener(
      loadUrlByLongUrlRepository,
      addUrlRepository,
      encoder,
      generator
    )

    return new ShortenUrlRoute(urlShortener)
  }
}
