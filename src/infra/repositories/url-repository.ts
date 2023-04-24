import { Url } from "../../domain/models/url"

export interface UrlRepository {
  add: (url: Url) => Promise<Url>
  load: (longUrl: string) => Promise<Url | null>
}

interface LoadUrlByString {
  load: (input: string) => Promise<Url | null>
}

export interface LoadUrlByShortUrlRepository extends LoadUrlByString {}

export interface LoadUrlByLongUrlRepository extends LoadUrlByString {}

export interface AddUrlRepository {
  add: (url: Url) => Promise<Url>
}
