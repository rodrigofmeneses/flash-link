import { BadRequestError } from "../errors/bad-request-error"

type HttpRequest = {
  body: { [key: string]: string }
  // param: { [key: string]: string }
  // query: { [key: string]: string }
}

// type HttpResponse = {
//   response: { [key: string]: string }
//   statusCode: number
// }

function isEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0
}

class ShortenUrl {
  async route(httpRequest: HttpRequest) {
    if (isEmpty(httpRequest.body)) {
      throw new BadRequestError()
    }
    return true
  }
}

describe("ShortenUrlRoute", () => {
  describe("When no body is provided", () => {
    test("should throws BadRequestError", async () => {
      const httpRequestEmptyBody: HttpRequest = { body: {} }
      const sut = new ShortenUrl()

      const promise = sut.route(httpRequestEmptyBody)

      expect(promise).rejects.toThrowError(new BadRequestError())
    })
  })
})
