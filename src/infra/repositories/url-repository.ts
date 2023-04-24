import { Url } from "../../domain/models/url"

export interface UrlRepository {
  add: (url: Url) => Promise<Url>
  load: (longUrl: string) => Promise<Url | null>
}

export interface LoadUrlByIdRepository {
  load: (id: number) => Promise<Url | null>
}

export interface LoadUrlByLongUrlRepository {
  load: (longUrl: string) => Promise<Url | null>
}

export interface AddUrlRepository {
  add: (url: Url) => Promise<Url>
}
