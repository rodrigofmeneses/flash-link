import { UrlRepository } from "../../infra/repositories/url-repository"
import { fakeUrl } from "./mocks/fakes"
import { UrlRepositorySpy } from "./mocks/spys"

class UrlRedirector {
  constructor(private readonly repository: UrlRepository) {}
  async perform(shortUrl: string): Promise<number> {
    const url = await this.repository.load(shortUrl)
    if (!url) {
      throw new Error()
    }
    return 1
  }
}

const makeSut = () => {
  const urlRepository = new UrlRepositorySpy()
  const sut = new UrlRedirector(urlRepository)
  return { sut, urlRepository }
}

describe("UrlRedirector", () => {
  describe("when an invalid shortUrl is provided (not in db)", () => {
    test("should throws", () => {
      const { sut } = makeSut()
      const shortUrl = "invalid_url"

      const promise = sut.perform(shortUrl)

      expect(promise).rejects.toThrow()
    })
  })

  describe("when a valid shortUrl is provided (in db)", () => {
    test("should return a positive number", async () => {
      const { sut, urlRepository } = makeSut()
      const shortUrl = "valid_url"
      urlRepository.url = fakeUrl()

      const id = await sut.perform(shortUrl)

      expect(id).toBeGreaterThanOrEqual(0)
    })
  })
})
