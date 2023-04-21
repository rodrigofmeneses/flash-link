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

    test("should throw if invalid string is provided", async () => {
      const sut = makeSut()

      for (let value of "/*-+|%$!@#?") {
        const promise = sut.decode(value)

        expect(promise).rejects.toThrow()
      }
    })

    test.each([
      ["0", 0],
      ["a", 10],
      ["2TX", 11157],
      ["zn9edcu", 2009215674938],
    ])("should decode correctly", async (shortUrl, expected) => {
      const sut = makeSut()

      const base10value = await sut.decode(shortUrl)

      expect(base10value).toBe(expected)
    })
  })
})
