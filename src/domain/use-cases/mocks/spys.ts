import {
  AddUrlRepository,
  LoadUrlByShortUrlRepository,
  LoadUrlByLongUrlRepository,
} from "../../../infra/repositories/url-repository"
import { Encoder } from "../../../utils/helpers/encoder"
import { RandomNumberGenerator } from "../../../utils/helpers/number-generator"
import { Url } from "../../models/url"
import { makeFakeUrl } from "./fakes"

export class LoadUrlByLongUrlRepositorySpy
  implements LoadUrlByLongUrlRepository
{
  url: Url | null = null

  async load(longUrl: string) {
    return this.url
  }
}

export class LoadUrlByLongUrlRepositoryWithErrorSpy
  implements LoadUrlByLongUrlRepository
{
  load(input: string): Promise<Url | null> {
    throw new Error()
  }
}

export class LoadUrlByShortUrlRepositorySpy
  implements LoadUrlByShortUrlRepository
{
  url: Url | null = null

  async load(input: string) {
    return this.url
  }
}

export class AddUrlRepositorySpy implements AddUrlRepository {
  urlCount = 0
  url: Url = makeFakeUrl()

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
