import { Url } from "../../../domain/models/url"
import { IUrl, UrlMongo } from "../../helpers/mongo-helper"
import { LoadUrlByIdRepository } from "../url-repository"

export class MongoLoadUrlByIdRepositoryAdapter
  implements LoadUrlByIdRepository
{
  async load(id: number): Promise<Url | null> {
    if (id < 0) {
      throw new Error()
    }

    const url = await UrlMongo.findOne({ id })

    return this._parseMongoToUrl(url)
  }

  private _parseMongoToUrl(url: IUrl | null) {
    if (!url) {
      return null
    }
    return { id: url.id, shortUrl: url.shortUrl, longUrl: url.longUrl }
  }
}
