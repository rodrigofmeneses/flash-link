import { Schema, model } from "mongoose"
import { Url } from "../../domain/models/url"

const urlSchema = new Schema<Url>({
  id: { type: Number, required: true },
  shortUrl: { type: String, required: true },
  longUrl: { type: String, required: true },
})

export const UrlMongo = model<Url>("Url", urlSchema)
