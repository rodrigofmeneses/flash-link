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
      throw new Error()
    }
    return true
  }
}

describe("ShortenUrlRoute", () => {
  test("should throws if no body is provided", async () => {
    const httpRequestEmptyBody: HttpRequest = { body: {} }
    const sut = new ShortenUrl()

    const promise = sut.route(httpRequestEmptyBody)

    expect(promise).rejects.toThrow()
  })
})
