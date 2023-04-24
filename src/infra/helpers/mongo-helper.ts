import { Document, Schema, model } from "mongoose"
import { Url } from "../../domain/models/url"

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

export const UrlMongo = model<Url>("Url", urlSchema)
