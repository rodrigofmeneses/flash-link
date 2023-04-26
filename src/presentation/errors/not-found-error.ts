import { ApiError } from "./api-error"

export class NotFoundError extends Error implements ApiError {
  status: number
  message: string

  constructor(message?: string) {
    super()
    this.status = 404
    this.message = message || "Not Found"
  }
}
