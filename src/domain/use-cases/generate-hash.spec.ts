import { UrlRepository } from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"
import { RandomNumberGenerator } from "../../utils/helpers/number-generator"
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

class NumberGeneratorSpy implements RandomNumberGenerator {
  randomNumber = 0
  async generate() {
    return this.randomNumber
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
  const generator = new NumberGeneratorSpy()
  const sut = new UrlShortener(urlRepository, encoder, generator)
  return { sut, urlRepository, encoder, generator }
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

    test("Should return an url registry", async () => {
      const { sut, urlRepository } = makeSut()
      const longUrl = "any_url"
      urlRepository.url = fakeUrl()

      const url = await sut.perform(longUrl)

      expect(urlRepository.url).toEqual(url)
    })

    test("Should return an url registry when longUrl is stored in db", async () => {
      const { sut, urlRepository } = makeSut()
      const longUrl = fakeUrl().longUrl
      urlRepository.urlCount = 1
      urlRepository.url = fakeUrl()

      const url = await sut.perform(longUrl)

      expect(urlRepository.urlCount).toBe(1)
      expect(urlRepository.url).toEqual(url)
    })

    test("should generate a random id", async () => {
      const { sut, generator } = makeSut()
      const longUrl = "any_url"
      generator.randomNumber = 42

      const url = await sut.perform(longUrl)

      expect(generator.randomNumber).toBe(url.id)
    })
  })
})
