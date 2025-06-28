/**
 * @fileoverview
 * This file contains a utility for converting attribute values to booleans.
 * It's designed to be used as a custom converter for Lit properties, ensuring
 * consistent handling of boolean attributes across all components.
 */

/**
 * Converts an attribute value to a boolean.
 * This converter handles `null`, `undefined`, `boolean`, and `string` values
 * to provide a consistent boolean representation for component properties.
 *
 * - `null` or `undefined` values are treated as `false`.
 * - If the value is already a `boolean`, it is returned as is.
 * - String values are considered `true` unless they are exactly equal to the string 'false'.
 *   This means that an empty string (like in `<my-element disabled>`) is correctly interpreted as `true`.
 *
 * @param {string | boolean | null} value The attribute value to convert.
 * @returns {boolean} The boolean representation of the value.
 */
export const booleanConverter = (value: string | boolean | null): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return value !== 'false';
};
