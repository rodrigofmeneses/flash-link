export interface Encoder {
  encode: (url: string) => Promise<string>
}
