import { MongoMemoryServer } from "mongodb-memory-server"
import { inMemoryConnect, inMemoryDisconnect } from "../../helpers/mongo-helper"
import { LoadUrlByLongUrlRepository } from "../url-repository"
import { Url } from "../../../domain/models/url"

class MongoLoadUrlByLongUrlRepositoryAdapter
  implements LoadUrlByLongUrlRepository
{
  async load(longUrl: string) {
    return null
  }
}

describe("MongoLoadUrlByLongUrlRepositoryAdapter", () => {
  let mongoServer: MongoMemoryServer
  beforeAll(async () => {
    mongoServer = await inMemoryConnect()
  })

  afterAll(async () => {
    await inMemoryDisconnect(mongoServer)
  })

  test("should return null if longUrl not found", async () => {
    const sut = new MongoLoadUrlByLongUrlRepositoryAdapter()
    const longUrl = "not_found_url"

    const url = await sut.load(longUrl)

    expect(url).toBeNull()
  })
})
