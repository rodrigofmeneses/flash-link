import { UrlRepository } from "../../../infra/repositories/url-repository"
import { Encoder } from "../../../utils/helpers/encoder"
import { RandomNumberGenerator } from "../../../utils/helpers/number-generator"
import { Url } from "../../models/url"

export class UrlRepositorySpy implements UrlRepository {
  urlCount = 0
  url: Url | null = null

  async load(longUrl: string) {
    return this.url
  }

  async add(Url: Url) {
    this.urlCount++
    return this.url || Url
  }
}

export class EncoderSpy implements Encoder {
  encoded = ""
  async encode(id: number) {
    return this.encoded
  }
}

export class NumberGeneratorSpy implements RandomNumberGenerator {
  randomNumber = 0
  async generate() {
    return this.randomNumber
  }
}
