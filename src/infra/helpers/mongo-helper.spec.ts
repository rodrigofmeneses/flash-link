import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { makeFakeUrl } from "../../domain/use-cases/mocks/fakes"
import { UrlMongo, inMemoryConnect, inMemoryDisconnect } from "./mongo-helper"

describe("insert", () => {
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await inMemoryConnect()
  })

  afterAll(async () => {
    await inMemoryDisconnect(mongoServer)
  })

  test("should insert an url into collection", async () => {
    const url = new UrlMongo(makeFakeUrl())

    await url.save()
    const dbUrl = await UrlMongo.findOne({ id: url.id })

    expect(dbUrl?.longUrl).toBe(url.longUrl)
  })
})
