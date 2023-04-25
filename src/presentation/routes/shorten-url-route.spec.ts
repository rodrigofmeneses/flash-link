import { makeFakeUrl } from "../../domain/use-cases/mocks/fakes"
import {
  AddUrlRepositorySpy,
  EncoderSpy,
  LoadUrlByLongUrlRepositorySpy,
  NumberGeneratorSpy,
} from "../../domain/use-cases/mocks/spys"
import { BadRequestError } from "../errors/bad-request-error"
import { HttpRequest } from "../helpers/http-request"
import { UrlShortenerSpy } from "./mocks/spys"
import { ShortenUrl } from "./shorten-url-route"

const makeSut = () => {
  const urlShortener = new UrlShortenerSpy(
    new LoadUrlByLongUrlRepositorySpy(),
    new AddUrlRepositorySpy(),
    new EncoderSpy(),
    new NumberGeneratorSpy()
  )
  const sut = new ShortenUrl(urlShortener)
  return { sut, urlShortener }
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
    test("should return a http response with short url and status 200", async () => {
      const { sut, urlShortener } = makeSut()
      const fakeUrl = makeFakeUrl()
      const httpRequest: HttpRequest = { body: { longUrl: fakeUrl.longUrl } }
      urlShortener.shortUrl = fakeUrl.shortUrl

      const httpResponse = await sut.route(httpRequest)

      expect(httpResponse.data?.shortUrl).toBe(fakeUrl.shortUrl)
      expect(httpResponse.status).toBe(200)
    })
  })
})
