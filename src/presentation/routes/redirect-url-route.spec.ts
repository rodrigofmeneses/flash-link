import { InvalidShortUrlError } from "../../domain/errors/invalid-short-url-error"
import { LoadUrlByShortUrlRepositorySpy } from "../../domain/use-cases/mocks/spys"
import { UrlRedirector } from "../../domain/use-cases/redirect-url"
import { InternalServerError } from "../errors/internal-server-error"
import { NotFoundError } from "../errors/not-found-error"
import { HttpRequest } from "../helpers/http-request"
import { HttpResponse } from "../helpers/http-response"
import { isEmpty } from "../helpers/is-empty"
import { LoadUrlByShortUrlRepository } from "../../infra/repositories/url-repository"
import { Url } from "../../domain/models/url"
import { makeFakeUrl } from "../../domain/use-cases/mocks/fakes"

class RedirectUrlRoute {
  constructor(private urlRedirector: UrlRedirector) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (isEmpty(httpRequest.param) || !httpRequest.param?.shortUrl) {
      return { status: 404, error: new NotFoundError() }
    }
    const { shortUrl } = httpRequest.param
    let longUrl: string = ""

    try {
      longUrl = await this.urlRedirector.perform(shortUrl)
    } catch (error) {
      if (error instanceof InvalidShortUrlError) {
        return { status: 404, error: new NotFoundError() }
      }
      return { status: 500, error: new InternalServerError() }
    }

    return { status: 200, data: { longUrl } }
  }
}

class LoadUrlByShortUrlRepositoryWithErrorSpy
  implements LoadUrlByShortUrlRepository
{
  async load(input: string): Promise<Url | null> {
    throw new Error()
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

  describe("When valid shortUrl is provided", () => {
    test("should success", async () => {
      const { sut, loadUrlByShortUrlRepository } = makeSut()
      const fakeUrl = makeFakeUrl()
      loadUrlByShortUrlRepository.url = fakeUrl
      const httpRequest: HttpRequest = {
        param: { shortUrl: fakeUrl.shortUrl },
      }

      const httpResponse = await sut.route(httpRequest)

      expect(httpResponse.status).toBe(200)
      expect(httpResponse.data).toEqual({ longUrl: fakeUrl.longUrl })
    })
  })

  describe("When UrlRedirector throws other than InvalidShortUrlError", () => {
    test("should throws InternalServerError", async () => {
      const loadUrlByShortUrlRepository =
        new LoadUrlByShortUrlRepositoryWithErrorSpy()
      const urlRedirector = new UrlRedirector(loadUrlByShortUrlRepository)
      const sut = new RedirectUrlRoute(urlRedirector)
      const anyHttpRequest: HttpRequest = { param: { shortUrl: "anyShortUrl" } }

      const httpResponse = await sut.route(anyHttpRequest)

      expect(httpResponse.status).toBe(500)
      expect(httpResponse.error?.message).toBe(
        new InternalServerError().message
      )
    })
  })
})
