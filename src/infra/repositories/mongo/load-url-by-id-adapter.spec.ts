import { Url } from "../../../domain/models/url"
import { LoadUrlByIdRepository } from "../url-repository"

class MongoLoadUrlByIdRepository implements LoadUrlByIdRepository {
  async load(id: number): Promise<Url | null> {
    throw new Error()
  }
}

describe("MongoLoadUrlByIdRepository", () => {
  test("should throws when invalid id is provided", async () => {
    const sut = new MongoLoadUrlByIdRepository()
    const invalidNumber = -1

    const promise = sut.load(invalidNumber)

    expect(promise).rejects.toThrow()
  })
})
