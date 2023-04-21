import { LoadUrlByIdRepository } from "../../infra/repositories/url-repository"
import { Encoder } from "../../utils/helpers/encoder"

export class UrlRedirector {
  constructor(
    private readonly loadUrlByIdRepository: LoadUrlByIdRepository,
    private readonly encoder: Encoder
  ) {}
  async perform(shortUrl: string): Promise<string> {
    const id = await this.encoder.decode(shortUrl)
    const url = await this.loadUrlByIdRepository.load(id)
    if (!url) {
      throw new Error()
    }
    return url.longUrl
  }
}
