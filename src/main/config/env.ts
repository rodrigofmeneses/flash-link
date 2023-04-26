import dotenv from "dotenv"
dotenv.config()

export const env = {
  MONGO_URL: process.env.MONGO_URL || "",
  PORT: process.env.PORT || "7777",
}
