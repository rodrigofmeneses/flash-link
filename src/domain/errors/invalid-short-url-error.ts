export class InvalidShortUrlError extends Error {
  constructor(message?: string) {
    super(message || "Invalid Short Url")
  }
}
