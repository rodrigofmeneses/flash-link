import { Url } from "../../../domain/models/url"
import {
  UrlMongo,
  parseMongoDocumentToUrlOrNull,
} from "../../helpers/mongo-helper"
import { AddUrlRepository } from "../url-repository"

export class MongoAddUrlRepositoryAdapter implements AddUrlRepository {
  async add(url: Url) {
    const dbUrl = await UrlMongo.create(url)
    const responseUrl = parseMongoDocumentToUrlOrNull(dbUrl) as Url
    return responseUrl
  }
}
