import { UrlShortener } from "../../../domain/use-cases/shorten-url"
import {
  AddUrlRepository,
  LoadUrlByLongUrlRepository,
} from "../../../infra/repositories/url-repository"
import { Encoder } from "../../../utils/helpers/encoder"
import { RandomNumberGenerator } from "../../../utils/helpers/number-generator"

export class UrlShortenerSpy extends UrlShortener {
  constructor(
    loadUrlByLongUrlRepository: LoadUrlByLongUrlRepository,
    addRepository: AddUrlRepository,
    encoder: Encoder,
    generator: RandomNumberGenerator
  ) {
    super(loadUrlByLongUrlRepository, addRepository, encoder, generator)
  }
  shortUrl: string = ""
  async perform(longUrl: string) {
    return this.shortUrl
  }
}
