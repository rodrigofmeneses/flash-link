import { Url } from "../../domain/models/url"

export interface UrlRepository {
  add: (url: Url) => Promise<Url>
  load: (longUrl: string) => Promise<Url | null>
}
