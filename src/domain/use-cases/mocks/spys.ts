import {
  AddUrlRepository,
  LoadUrlByIdRepository,
  LoadUrlByLongUrlRepository,
} from "../../../infra/repositories/url-repository"
import { Encoder } from "../../../utils/helpers/encoder"
import { RandomNumberGenerator } from "../../../utils/helpers/number-generator"
import { Url } from "../../models/url"
import { fakeUrl } from "./fakes"

export class LoadUrlByLongUrlRepositorySpy
  implements LoadUrlByLongUrlRepository
{
  url: Url | null = null

  async load(longUrl: string) {
    return this.url
  }
}

export class LoadUrlByIdRepositorySpy implements LoadUrlByIdRepository {
  url: Url | null = null

  async load(id: number) {
    return this.url
  }
}

export class AddUrlRepositorySpy implements AddUrlRepository {
  urlCount = 0
  url: Url = fakeUrl()

  async add(data: object) {
    this.urlCount++
    return this.url
  }
}

export class EncoderSpy implements Encoder {
  encoded = ""
  decoded = 0

  async encode(id: number) {
    return this.encoded
  }
  async decode(shortUrl: string) {
    return this.decoded
  }
}

export class NumberGeneratorSpy implements RandomNumberGenerator {
  randomNumber = 0
  async generate() {
    return this.randomNumber
  }
}