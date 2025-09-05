/**
 * The primitive object types that can be serialized as URL query params.
 */
export type UrlQuerySerializableType
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
export type UrlQuerySerializableConstructor
  = StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | StringConstructor[]
  | NumberConstructor[]
  | null
  | undefined;

/**
 * The primitive object types that can appear as serialized value in
 * a URL query. Strings, it's mostly strings.
 */
export type UrlQuerySerializedValue = UrlQuerySerializableTypeToSerializedType<UrlQuerySerializableType>;

/**
 * Maps serializable runtime type representations (e.g. "StringConstructor") to
 * their TS primitive equivalent (e.g. "string").
 */
export type UrlQuerySerializableConstructorToType<T extends UrlQuerySerializableConstructor> =
  T extends StringConstructor ? string
    : T extends NumberConstructor ? number
      : T extends BooleanConstructor ? boolean
        : T extends StringConstructor[] ? string[]
          : T extends NumberConstructor[] ? number[]
            : T extends null ? boolean
              : undefined;

/**
 * Maps serializable TS types (e.g. "string") to their runtime-equivalent
 * representation (e.g. "StringConstructor").
 */
export type UrlQuerySerializableTypeToConstructor<T extends UrlQuerySerializableType> =
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
export type UrlQuerySerializableTypeToSerializedType<T extends UrlQuerySerializableType> =
  T extends string ? string
    : T extends number ? string
      : T extends boolean ? string
        : T extends string[] ? string[]
          : T extends number[] ? string[]
            : T extends null ? null
              : undefined;

/**
 * Maps serializable runtime type representations (e.g. "StringConstructor[]") to
 * their URL query serialized representation (e.g. "string | string[]").
 */
export type UrlQuerySerializableConstructorToSerializedType<T extends UrlQuerySerializableConstructor> =
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
export type UrlQuerySerializableObject = Record<string, UrlQuerySerializableType>;

/**
 * A SerializationMap is a runtime object that defines how URL query values should be
 * interpreted.
 */
export type UrlQuerySerializationMap = Record<string, { type: UrlQuerySerializableConstructor }>;

/**
 * The representation of an object after it has been serialized. Property values
 * will always be either strings, arrays of strings, or undefined.
 */
export type UrlQuerySerializedObject<S extends UrlQuerySerializableObject | UrlQuerySerializationMap> =
  S extends UrlQuerySerializableObject
    ? { [K in keyof S]: UrlQuerySerializableTypeToSerializedType<S[K]> }
    : S extends UrlQuerySerializationMap
      ? { [K in keyof S]: UrlQuerySerializableConstructorToSerializedType<S[K]['type']> }
      : never;

/**
 * The representation of an object after it has been deserialized. This works
 * best when provided a SerializationMap, as those are able to provide a more
 * accurate description of what is expected. All properties are made optional,
 * since there is no way to guarantee they exist in the URL.
 */
export type UrlQueryDeserializedObject<S extends UrlQuerySerializableObject | UrlQuerySerializationMap> =
  S extends UrlQuerySerializableObject
    ? Partial<{ [K in keyof S]: S[K] }>
    : S extends UrlQuerySerializationMap
      ? Partial<{ [K in keyof S]: UrlQuerySerializableConstructorToType<S[K]['type']> }>
      : never;
