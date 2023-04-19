export interface Encoder {
  encode: (id: number) => Promise<string>
}
