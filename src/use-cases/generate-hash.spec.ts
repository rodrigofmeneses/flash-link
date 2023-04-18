interface UrlRepository {
  add: (input: object) => Promise<string>
  load: (url: string) => Promise<string | null>
}
interface Encoder {
  encode: (url: string) => Promise<string>
}
class UrlShortener {
  constructor(
    private readonly repository: UrlRepository,
    private readonly encoder: Encoder
  ) {}

  async generate(url: string) {
    let hash = await this.repository.load(url)
    if (hash) {
      return hash
    }
    hash = await this.encoder.encode(url)
    this.repository.add({ url, hash })
    return hash
  }
}
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

      await sut.generate("any_url")

      expect(urlRepository.urlCount).toBe(1)
    })
  })
})
