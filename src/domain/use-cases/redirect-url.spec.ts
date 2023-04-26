import { InvalidShortUrlError } from "../errors/invalid-short-url-error"
import { makeFakeUrl } from "./mocks/fakes"
import { EncoderSpy, LoadUrlByShortUrlRepositorySpy } from "./mocks/spys"
import { UrlRedirector } from "./redirect-url"

const makeSut = () => {
  const loadUrlByIdRepository = new LoadUrlByShortUrlRepositorySpy()
  const encoder = new EncoderSpy()
  const sut = new UrlRedirector(loadUrlByIdRepository)
  return { sut, loadUrlByIdRepository, encoder }
}

describe("UrlRedirector", () => {
  describe("when an shortUrl provided is not in db", () => {
    test("should throws", () => {
      const { sut } = makeSut()
      const shortUrl = "missing_url"

      const promise = sut.perform(shortUrl)

      expect(promise).rejects.toThrow(new InvalidShortUrlError())
    })
  })

  describe("when shortUrl in db is provided", () => {
    test("should return a longUrl", async () => {
      const { sut, loadUrlByIdRepository } = makeSut()
      const shortUrl = "correct_url"
      loadUrlByIdRepository.url = makeFakeUrl()

      const longUrl = await sut.perform(shortUrl)

      expect(longUrl).toBe(loadUrlByIdRepository.url.longUrl)
    })
  })
})
