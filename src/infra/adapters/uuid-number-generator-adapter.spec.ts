import { RandomNumberGenerator } from "../../utils/helpers/number-generator"
import { parse, v4 as uuid } from "uuid"

class UuidNumberGeneratorAdapter implements RandomNumberGenerator {
  async generate() {
    let parsedUuid = parse(uuid())
    let buffer = Buffer.from(parsedUuid)
    let result = buffer.readUInt32BE(0)
    return result
  }
}

describe("UuidNumberGeneratorAdapter", () => {
  describe("When generate", () => {
    test("should return a unique number", async () => {
      const sut = new UuidNumberGeneratorAdapter()

      const resultOne = await sut.generate()
      const resultTwo = await sut.generate()

      expect(resultOne).not.toBe(resultTwo)
    })
  })
})
