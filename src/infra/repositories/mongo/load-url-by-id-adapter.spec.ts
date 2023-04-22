import { Url } from "../../../domain/models/url"
import { LoadUrlByIdRepository } from "../url-repository"

class MongoLoadUrlByIdRepository implements LoadUrlByIdRepository {
  async load(id: number): Promise<Url | null> {
    if (id < 0) {
      throw new Error()
    }
    return null
  }
}

const makeSut = () => {
  return new MongoLoadUrlByIdRepository()
}

describe("MongoLoadUrlByIdRepository", () => {
  describe("When invalid id is provided", () => {
    test("should throws", async () => {
      const sut = makeSut()
      const invalidNumber = -1

      const promise = sut.load(invalidNumber)

      expect(promise).rejects.toThrow()
    })
  })

  describe("When valid is is provided", () => {
    test("should return null if url not found", async () => {
      const sut = makeSut()
      const validNumber = 42

      const url = await sut.load(validNumber)

      expect(url).toBeNull()
    })
  })
})
