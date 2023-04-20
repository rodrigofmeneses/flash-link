import { RandomNumberGenerator } from "../../utils/helpers/number-generator"
import { parse, v4 as uuid } from "uuid"

export class UuidNumberGeneratorAdapter implements RandomNumberGenerator {
  async generate() {
    let parsedUuid = parse(uuid())
    let buffer = Buffer.from(parsedUuid)
    let result = buffer.readUInt32BE(0)
    return result
  }
}
