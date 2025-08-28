/**
 * The primitive object types that can be serialized as URL query params.
 */
export type SerializableTypes
  = string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[];


/**
 * The primitive object types that can be serialized as URL query params,
 * defined as the constructor type of the primitive.
 */
export type SerializableConstructors
  = StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | StringConstructor[]
  | NumberConstructor[]
  | null
  | undefined;


/**
 * Maps serializable TS types (e.g. "string") to their runtime-equivalent
 * representation (e.g. "StringConstructor").
 */
export type SerializableTypeToConstructor<T extends SerializableTypes> =
  T extends string ? StringConstructor
    : T extends number ? NumberConstructor
      : T extends boolean ? BooleanConstructor
        : T extends string[] ? StringConstructor[]
          : T extends number[] ? NumberConstructor[]
            : T extends null ? null
              : undefined;


/**
 * Maps serializable TS types (e.g. "number[]") to their URL query serialized
 * representation (e.g. "string[]").
 */
export type SerializableTypeToSerializedType<T extends SerializableTypes> =
  T extends string ? string
    : T extends number ? string
      : T extends boolean ? string
        : T extends string[] ? string[]
          : T extends number[] ? string[]
            : T extends null ? null
              : undefined;


/**
 * Maps serializable runtime type representations (e.g. "StringConstructor") to
 * their TS primitive equivalent (e.g. "string").
 */
export type SerializableConstructorToType<T extends SerializableConstructors> =
  T extends StringConstructor ? string
    : T extends NumberConstructor ? number
      : T extends BooleanConstructor ? boolean
        : T extends StringConstructor[] ? string[]
          : T extends NumberConstructor[] ? number[]
            : T extends null ? boolean
              : undefined;


/**
 * Maps serializable runtime type representations (e.g. "StringConstructor[]") to
 * their URL query serialized representation (e.g. "string | string[]").
 */
export type SerializableConstructorToSerializedType<T extends SerializableConstructors> =
  T extends StringConstructor ? string
    : T extends NumberConstructor ? string
      : T extends BooleanConstructor ? (string | null)
        : T extends StringConstructor[] ? (string | string[])
          : T extends NumberConstructor[] ? (string | string[])
            : T extends null ? string
              : undefined;


/**
 * A SerializableObject is a string-keyed POJO whose values are limited to certain
 * primitives that can be serialized in a URL query.
 */
export type SerializableObject = Record<string, SerializableTypes>;


/**
 * A SerializationMap is a runtime object that defines how URL query values should be
 * interpreted.
 */
export type SerializationMap = Record<string, { type: SerializableConstructors }>;


/**
 * The representation of an object after it has been serialized. Property values
 * will always be either strings, arrays of strings, or undefined.
 */
export type SerializedObject<S extends SerializableObject | SerializationMap> =
  S extends SerializableObject
    ? { [K in keyof S]: SerializableTypeToSerializedType<S[K]> }
    : S extends SerializationMap
      ? { [K in keyof S]: SerializableConstructorToSerializedType<S[K]['type']> }
      : never;


/**
 * The representation of an object after it has been deserialized. This works
 * best when provided a SerializationMap, as those are able to provide a more
 * accurate description of what is expected. All properties are made optional,
 * since there is no way to guarantee they exist in the URL.
 */
export type DeserializedObject<S extends SerializableObject | SerializationMap> =
  S extends SerializableObject
    ? Partial<{ [K in keyof S]: S[K] }>
    : S extends SerializationMap
      ? Partial<{ [K in keyof S]: SerializableConstructorToType<S[K]['type']> }>
      : never;


/**
 * Turns a SerializableQueryValue (a serializable primitive) into a RawQueryValue.
 * Null and undefined values are dropped from arrays in the process.
 */
export function serializeQueryValue<T extends SerializableTypes>(value: T): SerializableTypeToSerializedType<T> {
  if (Array.isArray(value)) {
    return value
      .map((item) => serializeQueryValue(item))
      .filter(Boolean) as SerializableTypeToSerializedType<T>;
  }

  return (
    (value === null || value === undefined) ? value : value.toString()
  ) as SerializableTypeToSerializedType<T>;
}


export type SerializeQueryObjectOptions = {
  removeUndefined? : boolean;
  removeNull?      : boolean;
};

/**
 * Serializes an object so that it can be applied as URL query parameters.
 */
export function serializeQueryObject<S extends SerializableObject>(
  source: S,
  options: SerializeQueryObjectOptions = {},
) {
  const results = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(source)) {
    const serialized = serializeQueryValue(value);

    if (serialized === undefined && options.removeUndefined) {
      continue;
    }
    else if (serialized === null && options.removeNull) {
      continue;
    }

    results[key] = serialized;
  }

  return results as SerializedObject<S>;
}


/**
 * Given a serialized value, attempts to deserialize it to the described type.
 */
export function deserializeQueryValue<
  V extends string | string[] | null | undefined,
  M extends SerializableConstructors,
>(value: V, type: M) {
  // Interpret string query values
  if (typeof value === 'string') {
    if (type === String) {
      return value;
    }

    if (type === Number) {
      return parseFloat(value);
    }

    if (type === Boolean) {
      const cast = value.toLowerCase();

      if (cast === 'true' || cast === 'false') {
        return cast === 'true';
      }
    }

    if (Array.isArray(type)) {
      if (type[0] === String) {
        return [value];
      }

      if (type[0] === Number) {
        return [parseFloat(value)];
      }
    }
  }

  // Interpret arrays of query values
  if (Array.isArray(value) && Array.isArray(type)) {
    if (type[0] === String) {
      return value.map((item) => String(item));
    }

    if (type[0] === Number) {
      return value.map((item) => item ? parseFloat(item) : NaN);
    }
  }

  // Interpret nulls (key only, no value) as boolean true
  if (value === null && type === Boolean) {
    return true;
  }

  /* v8 ignore next 4 */
  // if (import.meta.dev) {
  //   warn(`[deserializeQueryValue] Cannot convert the "${ typeof value }" value "${ value }" to type "${ type }"`);
  // }

  return undefined;
}


/**
 * Inflate a serialized object, using the provided SerializationMap as the guide
 * to how values should be interpreted and cast.
 */
export function deserializeQueryObject<
  S extends SerializedObject<M>,
  M extends SerializationMap,
>(source: S, sourceMap: M, options: { keepUndefined?: boolean } = {}) {
  const results = {} as Record<string, unknown>;

  for (const [key, value] of Object.entries(source)) {
    if (options.keepUndefined === true || value !== undefined) {
      results[key] = sourceMap[key] ? deserializeQueryValue(value, sourceMap[key].type) : value;
    }
  }

  return results as DeserializedObject<M>;
}
