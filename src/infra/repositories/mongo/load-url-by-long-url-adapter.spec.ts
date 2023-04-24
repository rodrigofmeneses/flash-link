import { MongoMemoryServer } from "mongodb-memory-server"
import {
  UrlMongo,
  inMemoryConnect,
  inMemoryDisconnect,
} from "../../helpers/mongo-helper"
import { makeFakeUrl } from "../../../domain/use-cases/mocks/fakes"
import { MongoLoadUrlByLongUrlRepositoryAdapter } from "./load-url-by-long-url-adapter"

const makeSut = () => {
  return new MongoLoadUrlByLongUrlRepositoryAdapter()
}

describe("MongoLoadUrlByLongUrlRepositoryAdapter", () => {
  let mongoServer: MongoMemoryServer
  beforeAll(async () => {
    mongoServer = await inMemoryConnect()
  })

  afterAll(async () => {
    await inMemoryDisconnect(mongoServer)
  })

  test("should return null if longUrl not found", async () => {
    const sut = makeSut()
    const longUrl = "not_found_url"

    const url = await sut.load(longUrl)

    expect(url).toBeNull()
  })

  test("should return an url if longUrl exists in db", async () => {
    const sut = makeSut()
    const fakeUrl = makeFakeUrl()
    await new UrlMongo(fakeUrl).save()

    const url = await sut.load(fakeUrl.longUrl)

    expect(url).toEqual(fakeUrl)
  })
})
