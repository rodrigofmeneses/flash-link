import { Url } from "../../../domain/models/url"
import {
  UrlMongo,
  parseMongoDocumentToUrlOrNull,
} from "../../helpers/mongo-helper"
import { LoadUrlByIdRepository } from "../url-repository"

export class MongoLoadUrlByIdRepositoryAdapter
  implements LoadUrlByIdRepository
{
  async load(id: number): Promise<Url | null> {
    if (id < 0) {
      throw new Error()
    }

    const dbUrl = await UrlMongo.findOne({ id })
    const url = parseMongoDocumentToUrlOrNull(dbUrl)
    return url
  }
}
