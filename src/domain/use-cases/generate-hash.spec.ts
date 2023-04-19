import { UrlRepository } from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"
import { Url } from "../models/url"
import { UrlShortener } from "./generate-hash"

class UrlRepositorySpy implements UrlRepository {
  urlCount = 0
  url: Url | null = null

  async load(longUrl: string) {
    return this.url
  }

  async add(Url: Url) {
    this.urlCount++
    return this.url || Url
  }
}

class EncoderSpy implements Encoder {
  encoded = ""
  async encode(id: number) {
    return this.encoded
  }
}

const fakeUrl = () => ({
  id: 0,
  shortUrl: "encoded_url",
  longUrl: "any_url",
})

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

  describe("When perform", () => {
    test("Should add url registry to db", async () => {
      const { sut, urlRepository } = makeSut()
      const longUrl = "any_url"

      await sut.perform(longUrl)

      expect(urlRepository.urlCount).toBe(1)
    })

    test("Should return a url registry", async () => {
      const { sut, urlRepository } = makeSut()
      const longUrl = "any_url"
      urlRepository.url = fakeUrl()

      const Url = await sut.perform(longUrl)

      expect(urlRepository.url).toEqual(Url)
    })

    test("Should return a url registry stored in db", async () => {
      const { sut, urlRepository } = makeSut()
      const longUrl = fakeUrl().longUrl
      urlRepository.urlCount = 1
      urlRepository.url = fakeUrl()

      const Url = await sut.perform(longUrl)

      expect(urlRepository.urlCount).toBe(1)
      expect(urlRepository.url).toEqual(Url)
    })
  })
})
