import { Request, Response } from "express"
import { HttpRequest } from "../../presentation/helpers/http-request"
import { HttpResponse } from "../../presentation/helpers/http-response"

export class ExpressRouteAdapter {
  adapt(router: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
      }
      const httpResponse = await router(httpRequest)

      if (httpResponse.status === 302) {
        const url = httpResponse.data?.longUrl as string
        res.setHeader("location", url)
        return res.status(httpResponse.status).redirect(url)
      }
      return res.status(httpResponse.status).send(httpResponse.data)
    }
  }
}
