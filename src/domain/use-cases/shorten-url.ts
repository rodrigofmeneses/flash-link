import {
  AddUrlRepository,
  LoadUrlByLongUrlRepository,
} from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"
import { RandomNumberGenerator } from "../../utils/helpers/number-generator"
import { Url } from "../models/url"

export class UrlShortener {
  constructor(
    private readonly loadUrlByLongUrlRepository: LoadUrlByLongUrlRepository,
    private readonly addRepository: AddUrlRepository,
    private readonly encoder: Encoder,
    private readonly generator: RandomNumberGenerator
  ) {}

  async perform(longUrl: string): Promise<string> {
    let url = await this.loadUrlByLongUrlRepository.load(longUrl)
    if (url) {
      return url.shortUrl
    }
    const id = await this.generator.generate()
    const shortUrl = await this.encoder.encode(id)
    url = await this.addRepository.add({ id, shortUrl, longUrl })
    return url.shortUrl
  }
}
