export const isEmpty = (obj: object | undefined): boolean => {
  return !obj || Object.keys(obj).length === 0
}
