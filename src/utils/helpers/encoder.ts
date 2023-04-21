export interface Encoder {
  encode: (id: number) => Promise<string>
  decode: (shortUrl: string) => Promise<number>
}
