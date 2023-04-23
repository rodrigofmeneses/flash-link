import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { makeFakeUrl } from "../../domain/use-cases/mocks/fakes"
import { UrlMongo } from "./mongo-helper"

describe("insert", () => {
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

  test("should insert an url into collection", async () => {
    const url = new UrlMongo(makeFakeUrl())

    await url.save()
    const dbUrl = await UrlMongo.findOne({ id: url.id })

    expect(dbUrl?.longUrl).toBe(url.longUrl)
  })
})
