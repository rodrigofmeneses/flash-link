import { MongoMemoryServer } from "mongodb-memory-server"
import { Url } from "../../../domain/models/url"
import { makeFakeUrl } from "../../../domain/use-cases/mocks/fakes"
import { IUrl, UrlMongo } from "../../helpers/mongo-helper"
import { LoadUrlByIdRepository } from "../url-repository"
import mongoose from "mongoose"

class MongoLoadUrlByIdRepository implements LoadUrlByIdRepository {
  async load(id: number): Promise<Url | null> {
    if (id < 0) {
      throw new Error()
    }

    const url = await UrlMongo.findOne({ id })

    return this.parseMongoToUrl(url)
  }

  parseMongoToUrl(url: IUrl | null) {
    if (!url) {
      return null
    }
    return { id: url.id, shortUrl: url.shortUrl, longUrl: url.longUrl }
  }
}

const makeSut = () => {
  return new MongoLoadUrlByIdRepository()
}

describe("MongoLoadUrlByIdRepository", () => {
  let mongoServer: MongoMemoryServer
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()

    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  })

  describe("When invalid id is provided", () => {
    test("should throws", async () => {
      const sut = makeSut()
      const invalidNumber = -1

      const promise = sut.load(invalidNumber)

      expect(promise).rejects.toThrow()
    })
  })

  describe("When valid id is provided", () => {
    test("should return null if url not found", async () => {
      const sut = makeSut()
      const validNumber = 42

      const url = await sut.load(validNumber)

      expect(url).toBeNull()
    })

    test("should return an url", async () => {
      const sut = makeSut()
      const fakeUrl = makeFakeUrl()
      await new UrlMongo(fakeUrl).save()

      const url = await sut.load(fakeUrl.id)

      expect(url).toEqual(fakeUrl)
    })
  })
})
