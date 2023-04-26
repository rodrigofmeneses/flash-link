import { UrlShortener } from "../../domain/use-cases/shorten-url"
import { BadRequestError } from "../errors/bad-request-error"
import { HttpRequest } from "../helpers/http-request"
import { HttpResponse } from "../helpers/http-response"
import { isEmpty } from "../helpers/is-empty"

export class ShortenUrlRoute {
  constructor(private readonly urlShorten: UrlShortener) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (isEmpty(httpRequest.body) || !httpRequest.body?.longUrl) {
      return {
        status: 400,
        error: new BadRequestError(),
      }
    }
    const { longUrl } = httpRequest.body
    const shortUrl = await this.urlShorten.perform(longUrl)
    return { status: 200, data: { shortUrl } }
  }
}
