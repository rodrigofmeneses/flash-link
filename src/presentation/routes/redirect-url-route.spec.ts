import { NotFoundError } from "../errors/not-found-error"
import { HttpRequest } from "../helpers/http-request"
import { HttpResponse } from "../helpers/http-response"
import { isEmpty } from "../helpers/is-empty"

class RedirectUrlRoute {
  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (isEmpty(httpRequest.param)) {
      return { status: 404, error: new NotFoundError() }
    }
    return { status: 200 }
  }
}

const makeSut = () => {
  const sut = new RedirectUrlRoute()
  return { sut }
}

describe("RedirectUrlRoute", () => {
  describe("When no param is provided ", () => {
    test("should throws NotFoundError", async () => {
      const { sut } = makeSut()
      const httpRequestEmptyParam: HttpRequest = { param: {} }

      const httpResponse = await sut.route(httpRequestEmptyParam)

      expect(httpResponse.error?.message).toBe(new NotFoundError().message)
    })
  })
})
