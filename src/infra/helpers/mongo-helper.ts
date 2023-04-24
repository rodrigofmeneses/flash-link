import mongoose, { Document, Schema, model } from "mongoose"
import { Url } from "../../domain/models/url"
import { MongoMemoryServer } from "mongodb-memory-server"

export interface IUrl extends Document {
  id: number
  shortUrl: string
  longUrl: string
}

const urlSchema = new Schema({
  id: { type: Number, required: true, index: { unique: true } },
  shortUrl: { type: String, required: true },
  longUrl: { type: String, required: true, index: { unique: true } },
})

export const inMemoryConnect = async () => {
  const mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
  return mongoServer
}
export const inMemoryDisconnect = async (mongoServer: MongoMemoryServer) => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongoServer.stop()
}
export const UrlMongo = model<Url>("Url", urlSchema)
