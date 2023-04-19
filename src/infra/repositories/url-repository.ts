export interface UrlRepository {
  add: (input: object) => Promise<string>
  load: (url: string) => Promise<string | null>
}
