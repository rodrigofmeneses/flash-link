import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { makeFakeUrl } from "../../../domain/use-cases/mocks/fakes"
import { UrlMongo } from "../../helpers/mongo-helper"
import { MongoLoadUrlByIdRepositoryAdapter } from "./load-url-by-id-adapter"

const makeSut = () => {
  return new MongoLoadUrlByIdRepositoryAdapter()
}

describe("MongoLoadUrlByIdRepositoryAdapter", () => {
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
