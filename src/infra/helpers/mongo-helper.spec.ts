import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose, { Schema, model } from "mongoose"
import { Url as IUrl } from "../../domain/models/url"
import { fakeUrl } from "../../domain/use-cases/mocks/fakes"
let mongoServer: MongoMemoryServer

const urlSchema = new Schema<IUrl>({
  id: { type: Number, required: true },
  shortUrl: { type: String, required: true },
  longUrl: { type: String, required: true },
})

const Url = model<IUrl>("Url", urlSchema)

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
