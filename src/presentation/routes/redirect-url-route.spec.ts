import { InvalidShortUrlError } from "../../domain/errors/invalid-short-url-error"
import { LoadUrlByShortUrlRepositorySpy } from "../../domain/use-cases/mocks/spys"
import { UrlRedirector } from "../../domain/use-cases/redirect-url"
import { NotFoundError } from "../errors/not-found-error"
import { HttpRequest } from "../helpers/http-request"
import { HttpResponse } from "../helpers/http-response"
import { isEmpty } from "../helpers/is-empty"

class RedirectUrlRoute {
  constructor(private urlRedirector: UrlRedirector) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (isEmpty(httpRequest.param) || !httpRequest.param?.shortUrl) {
      return { status: 404, error: new NotFoundError() }
    }
    const shortUrl = httpRequest.param?.shortUrl

    try {
      const longUrl = await this.urlRedirector.perform(shortUrl)
    } catch (error) {
      if (error instanceof InvalidShortUrlError) {
        return { status: 404, error: new NotFoundError() }
      }
    }

    return { status: 200 }
  }
}

const makeSut = () => {
  const loadUrlByShortUrlRepository = new LoadUrlByShortUrlRepositorySpy()
  const urlRedirector = new UrlRedirector(loadUrlByShortUrlRepository)
  const sut = new RedirectUrlRoute(urlRedirector)
  return { sut, urlRedirector, loadUrlByShortUrlRepository }
}

describe("RedirectUrlRoute", () => {
  describe("When no param is provided ", () => {
    test("should throws NotFoundError", async () => {
      const { sut } = makeSut()
      const httpRequestEmptyParam: HttpRequest = { param: {} }

      const httpResponse = await sut.route(httpRequestEmptyParam)

      expect(httpResponse.status).toBe(404)
      expect(httpResponse.error?.message).toBe(new NotFoundError().message)
    })
  })

  describe("When invalid shortUrl is provided", () => {
    test("should throws NotFoundError", async () => {
      const { sut } = makeSut()
      const httpRequestEmptyParam: HttpRequest = {
        param: { shortUrl: "invalidShortUrl" },
      }

      const httpResponse = await sut.route(httpRequestEmptyParam)

      expect(httpResponse.status).toBe(404)
      expect(httpResponse.error?.message).toBe(new NotFoundError().message)
    })
  })
})
