export type HttpResponse = {
  status: number
  data?: { [key: string]: string }
  error?: Error
}
