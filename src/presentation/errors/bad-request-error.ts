import { ApiError } from "./api-error"

export class BadRequestError extends Error implements ApiError {
  status: number
  message: string

  constructor(message?: string) {
    super()
    this.status = 400
    this.message = message || "Bad Request"
  }
}
