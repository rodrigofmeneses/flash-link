import { Encoder } from "../../utils/helpers/encoder"

export class Base62EncoderAdapter implements Encoder {
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

  async decode(shortUrl: string) {
    if (shortUrl.split("").some((value) => !this.CHARACTERS.includes(value))) {
      throw new Error()
    }

    let id = 0
    for (let i = 0; i < shortUrl.length; i++) {
      let remainder = this.CHARACTERS.indexOf(shortUrl[i])
      let exponent = shortUrl.length - i - 1
      id += remainder * 62 ** exponent
    }
    return id
  }
}
