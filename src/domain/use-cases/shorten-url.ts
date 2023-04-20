import { UrlRepository } from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"
import { RandomNumberGenerator } from "../../utils/helpers/number-generator"
import { Url } from "../models/url"

export class UrlShortener {
  constructor(
    private readonly repository: UrlRepository,
    private readonly encoder: Encoder,
    private readonly generator: RandomNumberGenerator
  ) {}

  async perform(longUrl: string): Promise<Url> {
    let url = await this.repository.load(longUrl)
    if (url) {
      return url
    }
    const id = await this.generator.generate()
    const shortUrl = await this.encoder.encode(id)
    url = await this.repository.add({ id, shortUrl, longUrl })
    return url
  }
}
