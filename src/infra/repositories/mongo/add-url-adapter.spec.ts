import { MongoMemoryServer } from "mongodb-memory-server"
import {
  UrlMongo,
  inMemoryConnect,
  inMemoryDisconnect,
  parseMongoDocumentToUrlOrNull,
} from "../../helpers/mongo-helper"
import { makeFakeUrl } from "../../../domain/use-cases/mocks/fakes"
import { MongoAddUrlRepository } from "./add-url-adapter"

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

  describe("When duplicated url", () => {
    test("should throw", async () => {
      const sut = makeSut()
      const fakeUrl = makeFakeUrl()
      await sut.add(fakeUrl)

      const promise = sut.add(fakeUrl)

      expect(promise).rejects.toThrow()
    })
  })
})
