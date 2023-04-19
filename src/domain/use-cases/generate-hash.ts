import { UrlRepository } from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"
import { Url } from "../models/url"

export class UrlShortener {
  constructor(
    private readonly repository: UrlRepository,
    private readonly encoder: Encoder
  ) {}

  async perform(longUrl: string): Promise<Url> {
    let url = await this.repository.load(longUrl)
    if (url) {
      return url
    }
    const id = 1
    const shortUrl = await this.encoder.encode(id)
    url = await this.repository.add({ id, shortUrl, longUrl })
    return url
  }
}
