import { makeFakeUrl } from "../../domain/use-cases/mocks/fakes"
import {
  AddUrlRepositorySpy,
  EncoderSpy,
  LoadUrlByLongUrlRepositorySpy,
  NumberGeneratorSpy,
} from "../../domain/use-cases/mocks/spys"
import { UrlShortener } from "../../domain/use-cases/shorten-url"
import {
  AddUrlRepository,
  LoadUrlByLongUrlRepository,
} from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"
import { RandomNumberGenerator } from "../../utils/helpers/number-generator"
import { BadRequestError } from "../errors/bad-request-error"

type HttpRequest = {
  body: { [key: string]: string }
}

type HttpResponse = {
  data: { [key: string]: string }
  status: number
}

function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0
}

class ShortenUrl {
  constructor(private readonly urlShorten: UrlShortener) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (isEmpty(httpRequest.body) || !httpRequest.body.longUrl) {
      throw new BadRequestError()
    }
    const { longUrl } = httpRequest.body
    const shortUrl = await this.urlShorten.perform(longUrl)
    const httpResponse: HttpResponse = { data: { shortUrl }, status: 200 }
    return httpResponse
  }
}

class UrlShortenerSpy extends UrlShortener {
  constructor(
    loadUrlByLongUrlRepository: LoadUrlByLongUrlRepository,
    addRepository: AddUrlRepository,
    encoder: Encoder,
    generator: RandomNumberGenerator
  ) {
    super(loadUrlByLongUrlRepository, addRepository, encoder, generator)
  }
  shortUrl: string = ""
  async perform(longUrl: string) {
    return this.shortUrl
  }
}

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

      const promise = sut.route(httpRequestEmptyBody)

      expect(promise).rejects.toThrowError(new BadRequestError())
    })
  })

  describe("When body is provided", () => {
    test("should return a http response with short url and status 200", async () => {
      const { sut, urlShortener } = makeSut()
      const fakeUrl = makeFakeUrl()
      const httpRequest: HttpRequest = { body: { longUrl: fakeUrl.longUrl } }
      urlShortener.shortUrl = fakeUrl.shortUrl

      const httpResponse = await sut.route(httpRequest)

      expect(httpResponse.data.shortUrl).toBe(fakeUrl.shortUrl)
      expect(httpResponse.status).toBe(200)
    })
  })
})
