import { Url } from "../../../domain/models/url"
import {
  UrlMongo,
  parseMongoDocumentToUrlOrNull,
} from "../../helpers/mongo-helper"
import { LoadUrlByShortUrlRepository } from "../url-repository"

export class MongoLoadUrlByShortUrlRepositoryAdapter
  implements LoadUrlByShortUrlRepository
{
  async load(input: string): Promise<Url | null> {
    const dbUrl = await UrlMongo.findOne({ shortUrl: input })
    const url = parseMongoDocumentToUrlOrNull(dbUrl)
    return url
  }
}
