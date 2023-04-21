import { fakeUrl } from "./mocks/fakes"
import { EncoderSpy, LoadUrlByIdRepositorySpy } from "./mocks/spys"
import { UrlRedirector } from "./redirect-url"

const makeSut = () => {
  const loadUrlByIdRepository = new LoadUrlByIdRepositorySpy()
  const encoder = new EncoderSpy()
  const sut = new UrlRedirector(loadUrlByIdRepository, encoder)
  return { sut, loadUrlByIdRepository, encoder }
}

describe("UrlRedirector", () => {
  describe("when an shortUrl provided is not in db", () => {
    test("should throws", () => {
      const { sut } = makeSut()
      const shortUrl = "missing_url"

      const promise = sut.perform(shortUrl)

      expect(promise).rejects.toThrow()
    })
  })

  describe("when shortUrl in db is provided", () => {
    test("should return a longUrl", async () => {
      const { sut, loadUrlByIdRepository } = makeSut()
      const shortUrl = "correct_url"
      loadUrlByIdRepository.url = fakeUrl()

      const longUrl = await sut.perform(shortUrl)

      expect(longUrl).toBe(loadUrlByIdRepository.url.longUrl)
    })
  })
})
