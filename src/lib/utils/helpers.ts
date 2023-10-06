/**
 * Checks if a value is an object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export function isObject(value: any) {
  // Check if the value is falsy
  if (!value) return false;

  // Check if the value is an object by comparing its toString representation
  return value && Object.prototype.toString.call(value) === "[object Object]";
}