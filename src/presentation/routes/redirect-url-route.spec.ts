import {
  LoadUrlByShortUrlRepositorySpy,
  LoadUrlByShortUrlRepositoryWithErrorSpy,
} from "../../domain/use-cases/mocks/spys"
import { UrlRedirector } from "../../domain/use-cases/redirect-url"
import { InternalServerError } from "../errors/internal-server-error"
import { NotFoundError } from "../errors/not-found-error"
import { HttpRequest } from "../helpers/http-request"
import { makeFakeUrl } from "../../domain/use-cases/mocks/fakes"
import { RedirectUrlRoute } from "./redirect-url-route"

const makeSut = () => {
  const loadUrlByShortUrlRepository = new LoadUrlByShortUrlRepositorySpy()
  const urlRedirector = new UrlRedirector(loadUrlByShortUrlRepository)
  const sut = new RedirectUrlRoute(urlRedirector)
  return { sut, urlRedirector, loadUrlByShortUrlRepository }
}

describe("RedirectUrlRoute", () => {
  describe("When no params is provided ", () => {
    test("should throws NotFoundError", async () => {
      const { sut } = makeSut()
      const httpRequestEmptyparams: HttpRequest = { params: {} }

      const httpResponse = await sut.route(httpRequestEmptyparams)

      expect(httpResponse.status).toBe(404)
      expect(httpResponse.error?.message).toBe(new NotFoundError().message)
    })
  })

  describe("When invalid shortUrl is provided", () => {
    test("should throws NotFoundError", async () => {
      const { sut } = makeSut()
      const httpRequestEmptyparams: HttpRequest = {
        params: { shortUrl: "invalidShortUrl" },
      }

      const httpResponse = await sut.route(httpRequestEmptyparams)

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
        params: { shortUrl: fakeUrl.shortUrl },
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
      const anyHttpRequest: HttpRequest = {
        params: { shortUrl: "anyShortUrl" },
      }

      const httpResponse = await sut.route(anyHttpRequest)

      expect(httpResponse.status).toBe(500)
      expect(httpResponse.error?.message).toBe(
        new InternalServerError().message
      )
    })
  })
})
