import { Encoder } from "../../utils/helpers/encoder"

class Base62Adapter implements Encoder {
  async encode(id: number) {
    if (id < 0) {
      throw new Error()
    }

    return ""
  }
}

describe("Base62Adapter", () => {
  describe("When encode", () => {
    test("should throw if negative number is provided", async () => {
      const sut = new Base62Adapter()
      const promise = sut.encode(-1)

      expect(promise).rejects.toThrow()
    })
  })
})
