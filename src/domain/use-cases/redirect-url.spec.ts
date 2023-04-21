import { LoadUrlByIdRepository } from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"
import { fakeUrl } from "./mocks/fakes"
import { EncoderSpy, LoadUrlByIdRepositorySpy } from "./mocks/spys"

class UrlRedirector {
  constructor(
    private readonly loadUrlByIdRepository: LoadUrlByIdRepository,
    private readonly encoder: Encoder
  ) {}
  async perform(shortUrl: string): Promise<string> {
    const id = await this.encoder.decode(shortUrl)
    const url = await this.loadUrlByIdRepository.load(id)
    if (!url) {
      throw new Error()
    }
    return url.longUrl
  }
}

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
