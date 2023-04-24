import { MongoMemoryServer } from "mongodb-memory-server"
import {
  UrlMongo,
  inMemoryConnect,
  inMemoryDisconnect,
  parseMongoDocumentToUrlOrNull,
} from "../../helpers/mongo-helper"
import { LoadUrlByLongUrlRepository } from "../url-repository"
import { makeFakeUrl } from "../../../domain/use-cases/mocks/fakes"

class MongoLoadUrlByLongUrlRepositoryAdapter
  implements LoadUrlByLongUrlRepository
{
  async load(longUrl: string) {
    const dbUrl = await UrlMongo.findOne({ longUrl })
    const url = parseMongoDocumentToUrlOrNull(dbUrl)
    return url
  }
}

const makeSut = () => {
  return new MongoLoadUrlByLongUrlRepositoryAdapter()
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
    const sut = makeSut()
    const longUrl = "not_found_url"

    const url = await sut.load(longUrl)

    expect(url).toBeNull()
  })

  test("should return an url if longUrl exists in db", async () => {
    const sut = makeSut()
    const fakeUrl = makeFakeUrl()
    await new UrlMongo(fakeUrl).save()

    const url = await sut.load(fakeUrl.longUrl)

    expect(url).toEqual(fakeUrl)
  })
})
