import {
  UrlMongo,
  parseMongoDocumentToUrlOrNull,
} from "../../helpers/mongo-helper"
import { LoadUrlByLongUrlRepository } from "../url-repository"

export class MongoLoadUrlByLongUrlRepositoryAdapter
  implements LoadUrlByLongUrlRepository
{
  async load(longUrl: string) {
    const dbUrl = await UrlMongo.findOne({ longUrl })
    const url = parseMongoDocumentToUrlOrNull(dbUrl)
    return url
  }
}
