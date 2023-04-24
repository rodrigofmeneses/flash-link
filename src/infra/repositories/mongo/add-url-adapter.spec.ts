import { MongoMemoryServer } from "mongodb-memory-server"
import {
  UrlMongo,
  inMemoryConnect,
  inMemoryDisconnect,
  parseMongoDocumentToUrlOrNull,
} from "../../helpers/mongo-helper"
import { makeFakeUrl } from "../../../domain/use-cases/mocks/fakes"
import { AddUrlRepository } from "../url-repository"
import { Url } from "../../../domain/models/url"

class MongoAddUrlRepository implements AddUrlRepository {
  async add(url: Url) {
    return url
  }
}

const makeSut = () => {
  return new MongoAddUrlRepository()
}
describe("MongoAddUrlRepositoryAdapter", () => {
  let mongoServer: MongoMemoryServer
  beforeAll(async () => {
    mongoServer = await inMemoryConnect()
  })

  afterAll(async () => {
    await inMemoryDisconnect(mongoServer)
  })

  describe("When a valid url is provided", () => {
    test("should return same url", async () => {
      const sut = makeSut()
      const fakeUrl = makeFakeUrl()

      const url = await sut.add(fakeUrl)

      expect(url).toEqual(fakeUrl)
    })
  })
})
