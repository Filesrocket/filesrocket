import { parse } from 'path'
import uniqid from 'uniqid'

/**
 * Generate a unique filename.
 * @param filename Filename.
 */
export function generateRandomFilename (filename: string): string {
  const { name, ext } = parse(filename)
  const uniquename = `${name.split(' ').join('-')}-${uniqid()}`
  return `${uniquename}${ext}`
}

/**
 * Remove properties from an object.
 * @param payload Payload.
 * @param keys List of properties to omit.
 */
export function omitProps<T, K extends keyof T> (payload: T, keys: K[]): Omit<T, K> {
  const items = Object.keys(payload)
    .filter((key) => !keys.includes(key as K))
    .map((key) => ({ [key]: payload[key as K] }))

  return Object.assign({}, ...items)
}
