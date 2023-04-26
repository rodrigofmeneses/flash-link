import { Url } from "../../domain/models/url"
import { makeFakeUrl } from "../../domain/use-cases/mocks/fakes"
import {
  AddUrlRepositorySpy,
  EncoderSpy,
  LoadUrlByLongUrlRepositorySpy,
  LoadUrlByLongUrlRepositoryWithErrorSpy,
  NumberGeneratorSpy,
} from "../../domain/use-cases/mocks/spys"
import { UrlShortener } from "../../domain/use-cases/shorten-url"
import { BadRequestError } from "../errors/bad-request-error"
import { InternalServerError } from "../errors/internal-server-error"
import { HttpRequest } from "../helpers/http-request"
import { ShortenUrlRoute } from "./shorten-url-route"

const makeSut = () => {
  const loadUrlByLongUrlRepository = new LoadUrlByLongUrlRepositorySpy()
  const urlShortener = new UrlShortener(
    loadUrlByLongUrlRepository,
    new AddUrlRepositorySpy(),
    new EncoderSpy(),
    new NumberGeneratorSpy()
  )
  const sut = new ShortenUrlRoute(urlShortener)
  return { sut, loadUrlByLongUrlRepository }
}

describe("ShortenUrlRoute", () => {
  describe("When no body is provided", () => {
    test("should throws BadRequestError", async () => {
      const { sut } = makeSut()
      const httpRequestEmptyBody: HttpRequest = { body: {} }

      const httpResponse = await sut.route(httpRequestEmptyBody)

      expect(httpResponse.error?.message).toBe(new BadRequestError().message)
    })
  })

  describe("When body is provided", () => {
    describe("When success", () => {
      test("should return a http response with short url and status 200", async () => {
        const { sut, loadUrlByLongUrlRepository } = makeSut()
        const fakeUrl = makeFakeUrl()
        const httpRequest: HttpRequest = { body: { longUrl: fakeUrl.longUrl } }
        loadUrlByLongUrlRepository.url = fakeUrl

        const httpResponse = await sut.route(httpRequest)

        expect(httpResponse.data?.shortUrl).toBe(fakeUrl.shortUrl)
        expect(httpResponse.status).toBe(200)
      })
    })
    describe("When urlShortener throws", () => {
      test("should throws InternalServerError ", async () => {
        const loadUrlByLongUrlRepository =
          new LoadUrlByLongUrlRepositoryWithErrorSpy()
        const urlShortener = new UrlShortener(
          loadUrlByLongUrlRepository,
          new AddUrlRepositorySpy(),
          new EncoderSpy(),
          new NumberGeneratorSpy()
        )
        const sut = new ShortenUrlRoute(urlShortener)
        const anyHttpRequest: HttpRequest = {
          body: { longUrl: "anyLongUrl" },
        }

        const httpResponse = await sut.route(anyHttpRequest)

        expect(httpResponse.status).toBe(500)
        expect(httpResponse.error?.message).toBe(
          new InternalServerError().message
        )
      })
    })
  })
})
