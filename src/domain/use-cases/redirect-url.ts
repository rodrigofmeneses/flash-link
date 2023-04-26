import { LoadUrlByShortUrlRepository } from "../../infra/repositories/url-repository"
import { InvalidShortUrlError } from "../errors/invalid-short-url-error"

export class UrlRedirector {
  constructor(
    private readonly loadUrlByShortUrlRepository: LoadUrlByShortUrlRepository
  ) {}
  async perform(shortUrl: string): Promise<string> {
    const url = await this.loadUrlByShortUrlRepository.load(shortUrl)
    if (!url) {
      throw new InvalidShortUrlError()
    }
    return url.longUrl
  }
}
