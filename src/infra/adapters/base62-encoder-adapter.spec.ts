import { Base62EncoderAdapter } from "./base62-encoder-adapter"

const makeSut = () => {
  return new Base62EncoderAdapter()
}

describe("Base62Adapter", () => {
  describe("When encode", () => {
    test("should throw if negative number is provided", async () => {
      const sut = makeSut()

      const promise = sut.encode(-1)

      expect(promise).rejects.toThrow()
    })

    test.each([
      [0, "0"],
      [10, "a"],
      [11157, "2TX"],
      [2009215674938, "zn9edcu"],
    ])("should encode correctly", async (id, expected) => {
      const sut = makeSut()

      const base62value = await sut.encode(id)

      expect(base62value).toBe(expected)
    })
  })
})
