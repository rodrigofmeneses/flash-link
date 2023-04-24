import { MongoMemoryServer } from "mongodb-memory-server"
import { makeFakeUrl } from "../../../domain/use-cases/mocks/fakes"
import {
  UrlMongo,
  inMemoryConnect,
  inMemoryDisconnect,
} from "../../helpers/mongo-helper"
import { MongoLoadUrlByShortUrlRepositoryAdapter } from "./load-url-by-short-url-adapter"

const makeSut = () => {
  return new MongoLoadUrlByShortUrlRepositoryAdapter()
}

describe("MongoLoadUrlByShortUrlRepositoryAdapter", () => {
  let mongoServer: MongoMemoryServer
  beforeAll(async () => {
    mongoServer = await inMemoryConnect()
  })

  afterAll(async () => {
    await inMemoryDisconnect(mongoServer)
  })

  describe("When valid shortUrl is provided", () => {
    test("should return null if longUrl is not found", async () => {
      const sut = makeSut()
      const validNumber = "not_in_db"

      const url = await sut.load(validNumber)

      expect(url).toBeNull()
    })

    test("should return a longUrl", async () => {
      const sut = makeSut()
      const fakeUrl = makeFakeUrl()
      await new UrlMongo(fakeUrl).save()

      const url = await sut.load(fakeUrl.shortUrl)

      expect(url).toEqual(fakeUrl)
    })
  })
})
