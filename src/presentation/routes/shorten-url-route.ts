import { UrlShortener } from "../../domain/use-cases/shorten-url"
import { BadRequestError } from "../errors/bad-request-error"
import { InternalServerError } from "../errors/internal-server-error"
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
        data: { message: "Invalid body" },
      }
    }
    const { longUrl } = httpRequest.body
    let shortUrl: string = ""
    try {
      shortUrl = await this.urlShorten.perform(longUrl)
    } catch (error) {
      return {
        status: 500,
        error: new InternalServerError(),
        data: { message: "Internal Server Error" },
      }
    }
    return { status: 200, data: { shortUrl } }
  }
}
