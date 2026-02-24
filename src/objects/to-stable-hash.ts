import { toCyrb64Hash } from '#strings/to-cyrb64-hash.js';

/**
 * A (somewhat simple) way to generate a unique identifier for any value.
 *
 * At minimum, the hashes created by this method should be stable within the bounds
 * of a single process. Primitive values, and POJOs / arrays with primitives should
 * be stable indefinitely. More complex structures - Maps, HTMLElements, etc. - cannot
 * be relied on to generate the same hash across multiple processes.
 */
export function toStableHash(arg: unknown, compact: boolean = false) {
  const result = valueToHash(arg);
  return compact ? toCyrb64Hash(result) : result;
}


/**
 * Converts the given argument into a string. Consistently.
 */
function valueToHash(arg: unknown): string {
  if (arg instanceof Date) {
    return arg.toJSON();
  }

  if (typeof arg === 'symbol') {
    return arg.toString();
  }

  if (typeof arg === 'string') {
    return JSON.stringify(arg);
  }

  if (Object(arg) === arg && arg?.constructor !== RegExp) {
    return objectToHash(arg as object);
  }

  return String(arg);
}


const table = new WeakMap<object, string>();
let counter = 0;


/**
 * Serialization for objects. Arrays are iterated through, and the entry at each
 * index is evaluated. POJO keys are sorted and then iterated through. More
 * complex types like Maps, HTMLElements, etc. are given a unique ID that is stored
 * in a WeakMap for future lookup.
 */
function objectToHash(arg: object): string {
  let result = table.get(arg);

  if (result){
    return result;
  }

  // Store the hash first for circular reference detection
  // before entering recursive calls.
  // For other objects like set and map, this ID will be
  // directly used as the hash.
  result = ++counter + "~";
  table.set(arg, result);

  if (Array.isArray(arg)) {
    result = "@";

    for (const entry of arg) {
      result += valueToHash(entry) + ",";
    }

    table.set(arg, result);

    return result;
  }

  if (arg.constructor === Object) {
    result = "#";

    for (const key of Object.keys(arg).sort()) {
      const value = arg[key as keyof typeof arg];

      if (value !== undefined) {
        result += key + ':' + valueToHash(value) + ',';
      }
    }

    table.set(arg, result);
  }

  return result;
}
