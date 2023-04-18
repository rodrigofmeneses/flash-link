import { UrlRepository } from "../infra/url-repository"
import { Encoder } from "../utils/helpers/encoder"

export class UrlShortener {
  constructor(
    private readonly repository: UrlRepository,
    private readonly encoder: Encoder
  ) {}

  async generate(url: string) {
    let hash = await this.repository.load(url)
    if (hash) {
      return hash
    }
    hash = await this.encoder.encode(url)
    this.repository.add({ url, hash })
    return hash
  }
}
