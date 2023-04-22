import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { fakeUrl } from "../../domain/use-cases/mocks/fakes"
import { Url } from "./mongo-helper"
let mongoServer: MongoMemoryServer

describe("insert", () => {
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
    const url = new Url(fakeUrl())

    await url.save()
    const dbUrl = await Url.findOne({ id: url.id })

    expect(dbUrl?.longUrl).toBe(url.longUrl)
  })
})
