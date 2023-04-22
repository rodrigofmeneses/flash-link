import { Schema, model } from "mongoose"
import { Url as IUrl } from "../../domain/models/url"

const urlSchema = new Schema<IUrl>({
  id: { type: Number, required: true },
  shortUrl: { type: String, required: true },
  longUrl: { type: String, required: true },
})

export const Url = model<IUrl>("Url", urlSchema)
