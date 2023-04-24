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
    const dbUrl = await UrlMongo.create(url)
    const responseUrl = parseMongoDocumentToUrlOrNull(dbUrl) as Url
    return responseUrl
  }
}

const makeSut = () => {
  return new MongoAddUrlRepository()
}
describe("MongoAddUrlRepositoryAdapter", () => {
  let mongoServer: MongoMemoryServer
  beforeEach(async () => {
    mongoServer = await inMemoryConnect()
  })

  afterEach(async () => {
    await inMemoryDisconnect(mongoServer)
  })

  describe("When a valid url is provided", () => {
    test("should return same url", async () => {
      const sut = makeSut()
      const fakeUrl = makeFakeUrl()

      const url = await sut.add(fakeUrl)

      expect(url).toEqual(fakeUrl)
    })

    test("should add in db", async () => {
      const sut = makeSut()
      const fakeUrl = makeFakeUrl()

      const url = await sut.add(fakeUrl)
      const dbUrl = parseMongoDocumentToUrlOrNull(
        await UrlMongo.findOne({ id: fakeUrl.id })
      )

      expect(dbUrl).toEqual(url)
    })
  })
})
