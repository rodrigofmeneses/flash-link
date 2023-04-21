import { UrlRepository } from "../../infra/repositories/url-repository"
import { UrlRepositorySpy } from "./mocks/spys"

class UrlRedirector {
  constructor(private readonly repository: UrlRepository) {}
  async perform(shortUrl: string) {
    const url = await this.repository.load(shortUrl)
    if (!url) {
      throw new Error()
    }
  }
}

const makeSut = () => {
  const urlRepository = new UrlRepositorySpy()
  const sut = new UrlRedirector(urlRepository)
  return { sut, urlRepository }
}

describe("UrlRedirector", () => {
  describe("when an invalid url is provided (not in db)", () => {
    test("should throws", () => {
      const { sut } = makeSut()
      const url = "invalid_url"

      const promise = sut.perform(url)

      expect(promise).rejects.toThrow()
    })
  })
})
