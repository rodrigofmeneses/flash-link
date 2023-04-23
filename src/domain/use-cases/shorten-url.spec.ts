import { makeFakeUrl } from "./mocks/fakes"
import {
  AddUrlRepositorySpy,
  EncoderSpy,
  LoadUrlByLongUrlRepositorySpy,
  NumberGeneratorSpy,
} from "./mocks/spys"
import { UrlShortener } from "./shorten-url"

const makeSut = () => {
  const loadUrlByLongUrlRepositorySpy = new LoadUrlByLongUrlRepositorySpy()
  const addUrlRepositorySpy = new AddUrlRepositorySpy()
  const encoder = new EncoderSpy()
  const generator = new NumberGeneratorSpy()
  const sut = new UrlShortener(
    loadUrlByLongUrlRepositorySpy,
    addUrlRepositorySpy,
    encoder,
    generator
  )
  return {
    sut,
    loadUrlByLongUrlRepositorySpy,
    addUrlRepositorySpy,
    encoder,
    generator,
  }
}

describe("UrlShortener", () => {
  describe("When create a instance", () => {
    test("Should not add a hash in repository at initialization", async () => {
      const { addUrlRepositorySpy } = makeSut()

      expect(addUrlRepositorySpy.urlCount).toBe(0)
    })
  })

  describe("When perform", () => {
    test("Should add url registry to db", async () => {
      const { sut, addUrlRepositorySpy } = makeSut()
      const longUrl = "any_url"

      await sut.perform(longUrl)

      expect(addUrlRepositorySpy.urlCount).toBe(1)
    })

    test("Should return an url registry", async () => {
      const { sut, loadUrlByLongUrlRepositorySpy } = makeSut()
      const longUrl = "any_url"
      loadUrlByLongUrlRepositorySpy.url = makeFakeUrl()

      const url = await sut.perform(longUrl)

      expect(loadUrlByLongUrlRepositorySpy.url).toEqual(url)
    })

    test("Should return an url registry when longUrl is stored in db", async () => {
      const { sut, addUrlRepositorySpy, loadUrlByLongUrlRepositorySpy } =
        makeSut()
      const longUrl = makeFakeUrl().longUrl
      addUrlRepositorySpy.urlCount = 1
      loadUrlByLongUrlRepositorySpy.url = makeFakeUrl()

      const url = await sut.perform(longUrl)

      expect(addUrlRepositorySpy.urlCount).toBe(1)
      expect(loadUrlByLongUrlRepositorySpy.url).toEqual(url)
    })

    test("should generate a random id", async () => {
      const { sut, generator, addUrlRepositorySpy } = makeSut()
      const longUrl = "any_url"
      const fake_random_number = 42
      addUrlRepositorySpy.url.id = fake_random_number
      generator.randomNumber = fake_random_number

      const url = await sut.perform(longUrl)

      expect(generator.randomNumber).toBe(url.id)
    })
  })
})
