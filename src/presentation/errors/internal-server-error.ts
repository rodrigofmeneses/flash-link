import { ApiError } from "./api-error"

export class InternalServerError extends Error implements ApiError {
  status: number
  message: string

  constructor(message?: string) {
    super()
    this.status = 500
    this.message = message || "Internal Server Error"
  }
}
