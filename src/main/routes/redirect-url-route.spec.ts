import { MongoMemoryServer } from "mongodb-memory-server"
import { app } from "../config/app"
import request from "supertest"
import {
  cleanDb,
  inMemoryConnect,
  inMemoryDisconnect,
} from "../../infra/helpers/mongo-helper"

describe("ShortenUrlRouter", () => {
  let mongoServer: MongoMemoryServer
  beforeAll(async () => {
    mongoServer = await inMemoryConnect()
  })

  beforeEach(async () => {
    await cleanDb()
  })

  afterAll(async () => {
    await inMemoryDisconnect(mongoServer)
  })
  describe("When GET /:shortUrl", () => {
    describe("with incorrect shortUrl", () => {
      test("should response status 404", async () => {
        const param = "incorrectParam"

        await request(app).get(`/${param}`).expect(404)
      })
    })
    describe("with correct shortUrl", () => {
      test("should redirect status 301", async () => {
        const longUrl = "valid_url"
        const response = await request(app)
          .post("/api/v1/shorten")
          .send({ longUrl })
        const { shortUrl } = response.body

        await request(app)
          .get(`/${shortUrl}`)
          .expect("location", longUrl)
          .expect(302)
      })
    })
  })
})
