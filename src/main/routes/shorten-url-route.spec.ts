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

  describe("When Post in /api/v1/shorten", () => {
    describe("with no body", () => {
      test("should response status 400", async () => {
        const body = {}

        await request(app).post("/api/v1/shorten").send(body).expect(400)
      })
    })

    describe("with invalid body", () => {
      test("should response status 400", async () => {
        const body = { invalidBody: "" }
        const body2 = { longUrl: "" }

        await request(app).post("/api/v1/shorten").send(body).expect(400)
        await request(app).post("/api/v1/shorten").send(body2).expect(400)
      })
    })

    describe("with valid body", () => {
      test("should response status 200", async () => {
        const body = { longUrl: "validUrl" }

        await request(app).post("/api/v1/shorten").send(body).expect(200)
      })
    })
  })
})
