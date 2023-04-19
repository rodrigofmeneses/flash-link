import { UrlRepository } from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"
import { UrlShortener } from "./generate-hash"

class UrlRepositorySpy implements UrlRepository {
  urlCount = 0
  hash = ""

  async load(url: string) {
    return this.hash
  }

  async add(input: object) {
    this.urlCount++
    return this.hash
  }
}

class EncoderSpy implements Encoder {
  hash = ""
  async encode(url: string) {
    return this.hash
  }
}

const makeSut = () => {
  const urlRepository = new UrlRepositorySpy()
  const encoder = new EncoderSpy()
  const sut = new UrlShortener(urlRepository, encoder)
  return { sut, urlRepository, encoder }
}

describe("UrlShortener", () => {
  describe("When create a instance", () => {
    test("Should not add a hash in repository at initialization", async () => {
      const { urlRepository } = makeSut()

      expect(urlRepository.urlCount).toBe(0)
    })
  })

  describe("When generate a hash", () => {
    test("Should add url and hash to db", async () => {
      const { sut, urlRepository } = makeSut()
      const url = "any_url"

      await sut.generate(url)

      expect(urlRepository.urlCount).toBe(1)
    })

    test("Should return a encoded_url", async () => {
      const { sut, encoder } = makeSut()
      const url = "any_url"
      encoder.hash = "encoded_url"

      const hash = await sut.generate(url)

      expect(encoder.hash).toBe(hash)
    })

    test("Should return a encoded_url stored in db", async () => {
      const { sut, urlRepository } = makeSut()
      const url = "db_url"
      urlRepository.urlCount = 1
      urlRepository.hash = "encoded_db_url"

      const hash = await sut.generate(url)

      expect(urlRepository.urlCount).toBe(1)
      expect(urlRepository.hash).toBe(hash)
    })
  })
})
