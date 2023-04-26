import { InvalidShortUrlError } from "../../domain/errors/invalid-short-url-error"
import { UrlRedirector } from "../../domain/use-cases/redirect-url"
import { InternalServerError } from "../errors/internal-server-error"
import { NotFoundError } from "../errors/not-found-error"
import { HttpRequest } from "../helpers/http-request"
import { HttpResponse } from "../helpers/http-response"
import { isEmpty } from "../helpers/is-empty"

export class RedirectUrlRoute {
  constructor(private urlRedirector: UrlRedirector) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (isEmpty(httpRequest.params) || !httpRequest.params?.shortUrl) {
      return {
        status: 404,
        error: new NotFoundError(),
        data: { message: "Page not found" },
      }
    }
    const { shortUrl } = httpRequest.params
    let longUrl: string = ""

    try {
      longUrl = await this.urlRedirector.perform(shortUrl)
    } catch (error) {
      if (error instanceof InvalidShortUrlError) {
        return {
          status: 404,
          error: new NotFoundError(),
          data: { message: "Page not found" },
        }
      }
      return {
        status: 500,
        error: new InternalServerError(),
        data: { message: "Internal Server Error" },
      }
    }

    return { status: 200, data: { longUrl } }
  }
}
