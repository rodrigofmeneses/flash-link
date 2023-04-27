import { app } from "../config/app"
import request from "supertest"

describe("ShortenUrlRouter", () => {
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
  })
})
