import { UuidNumberGeneratorAdapter } from "./uuid-number-generator-adapter"

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
