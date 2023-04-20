import { Encoder } from "../../utils/helpers/encoder"

class Base62EncoderAdapter implements Encoder {
  CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  async encode(id: number) {
    if (id < 0) {
      throw new Error()
    }

    let value = id
    let remainder: number
    let shortUrl = ""
    do {
      remainder = value % 62
      value = Math.floor(value / 62)
      shortUrl = shortUrl + this.CHARACTERS[remainder]
    } while (value != 0)

    return shortUrl.split("").reverse().join("")
  }
}

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
