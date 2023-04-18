class UrlShortener {
  constructor(private readonly repository: UrlRepository) {}
}

interface UrlRepository {}
class UrlRepositorySpy implements UrlRepository {
  urlCount = 0
}

const makeSut = () => {
  const urlRepository = new UrlRepositorySpy()
  const sut = new UrlShortener(urlRepository)
  return { sut, urlRepository }
}

describe("UrlShortener", () => {
  test("Should not add a hash in repository at initialization", async () => {
    const { urlRepository } = makeSut()

    expect(urlRepository.urlCount).toBe(0)
  })
})
