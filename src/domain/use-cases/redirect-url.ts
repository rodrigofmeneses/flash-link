import { LoadUrlByShortUrlRepository } from "../../infra/repositories/url-repository"

export class UrlRedirector {
  constructor(
    private readonly loadUrlByShortUrlRepository: LoadUrlByShortUrlRepository
  ) {}
  async perform(shortUrl: string): Promise<string> {
    const url = await this.loadUrlByShortUrlRepository.load(shortUrl)
    if (!url) {
      throw new Error()
    }
    return url.longUrl
  }
}
