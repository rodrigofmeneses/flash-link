export interface RandomNumberGenerator {
  generate: () => Promise<number>
}
