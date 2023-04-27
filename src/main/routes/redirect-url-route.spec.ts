import { app } from "../config/app"
import request from "supertest"

describe("ShortenUrlRouter", () => {
  describe("When Get in /:shortUrl", () => {
    describe("with incorrect shortUrl", () => {
      test("should response status 404", async () => {
        const param = "incorrectParam"

        await request(app).get(`/${param}`).expect(404)
      })
    })
  })
})
